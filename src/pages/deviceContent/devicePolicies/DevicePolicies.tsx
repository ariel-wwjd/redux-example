import React, { useState, useEffect, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Devices, DeviceTypes, Rule } from '@edgeiq/edgeiq-api-js';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { errorHighlight } from '../../../app/constants';
import { AttachPoliciesDrawer } from '../../../components/RightDrawer';
import TabsPage from '../../../components/TabsPage';
import { RootState } from '../../../redux/store';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
  setSelectedPolicies,
  setOriginalSelectedPolicies,
} from '../../../redux/reducers/policies.reducer';
import { setAlert } from '../../../redux/reducers/alert.reducer';

const DevicePolicies: React.FC = () => {
  const { id } = useParams<string>();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const selectedPolicies = useAppSelector(
    (state: RootState) => state.policies.selectedPolicies,
  );
  const originalPolicies = useAppSelector(
    (state: RootState) => state.policies.originalSelectedPolicies,
  );
  const editableDevice = useAppSelector(
    (state: RootState) => state.devices.newDevice,
  );
  const userCompanies = useAppSelector(
    (state: RootState) => state.user.userCompanies,
  );

  const columns: GridColDef[] = [
    {
      field: 'description',
      headerName: 'Policy Name',
      flex: 1,
      renderCell: (params: GridRenderCellParams): ReactElement => (
        <strong>{params.row.description}</strong>
      ),
    },
    {
      field: 'company_id',
      headerName: 'Account',
      flex: 0.5,
      renderCell: (params: GridRenderCellParams): ReactElement => (
        <span>
          {
            userCompanies.find(
              (company) => company._id === params.row.company_id,
            )?.name
          }
        </span>
      ),
    },
    {
      field: 'is_from_device_type',
      headerName: 'Attach via Device Profile',
      flex: 0.3,
      renderCell: (params: GridRenderCellParams): ReactElement => (
        <span>{params.row.is_from_device_type ? 'True' : 'False'}</span>
      ),
    },
  ];

  const handleChoosePolicies = (newPolicies: Rule[]): void => {
    dispatch(setSelectedPolicies(newPolicies));
    setOpen(false);
    setLoading(true);

    const attachPolicies = newPolicies.filter((newPolicy) =>
      originalPolicies.every(
        (originalPolicy) => newPolicy._id !== originalPolicy._id,
      ),
    );
    const detachPolicies = originalPolicies.filter((originalPolicy) =>
      newPolicies.every((newPolicy) => originalPolicy._id !== newPolicy._id),
    );

    //TODO: Check what its happening to bulkAttachRules
    //TODO: Check bulkDetachRules avaiability
    Promise.all([
      Promise.all(
        attachPolicies.map(async (attachPolicy) => {
          await Devices.attachRule(id as string, attachPolicy._id);
        }),
      ),
      Promise.all(
        detachPolicies.map(async (detachPolicy) => {
          await Devices.detachRule(id as string, detachPolicy._id);
        }),
      ),
    ])
      .then(() => {
        dispatch(setOriginalSelectedPolicies(newPolicies));
        dispatch(
          setAlert({
            type: 'success',
            highlight: 'Managing policies',
            message: 'Policies successfully updated.',
          }),
        );
      })
      .catch(() => {
        dispatch(
          setAlert({
            type: 'error',
            highlight: errorHighlight,
            message: 'Error while managing policies.',
          }),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (editableDevice) {
      setLoading(true);

      let deviceRules: Rule[];
      Devices.getRules(editableDevice._id)
        .then((resDeviceRules) => {
          deviceRules = resDeviceRules;

          return DeviceTypes.getRules(editableDevice.device_type_id);
        })
        .then((resDeviceTypeRules) => {
          const adaptedDeviceTypeRules = resDeviceTypeRules.map(
            (deviceTypeRule) => {
              return { ...deviceTypeRule, is_from_device_type: true };
            },
          );
          deviceRules.push(...adaptedDeviceTypeRules);
          dispatch(setSelectedPolicies(deviceRules));
          dispatch(setOriginalSelectedPolicies(deviceRules));
        })
        .catch((err) => {
          dispatch(
            setAlert({
              type: 'error',
              highlight: errorHighlight,
              message: err.message,
            }),
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [editableDevice]);

  return (
    <Box>
      <TabsPage
        columns={columns}
        rows={selectedPolicies}
        addButtonLabel="Add policies"
        onAddClick={(): void => setOpen(true)}
        createButtonLabel="Create policy"
        tableTitle="Policies attached"
        loading={loading}
      />
      <AttachPoliciesDrawer
        open={open}
        handleCloseDrawer={(): void => setOpen(false)}
        itemPolicies={true}
        onChoosingPolicies={handleChoosePolicies}
      />
    </Box>
  );
};

export default DevicePolicies;
