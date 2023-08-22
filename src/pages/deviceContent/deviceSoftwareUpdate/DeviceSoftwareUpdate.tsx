import React, { ReactElement, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  SoftwareUpdates,
  SoftwareUpdate,
  SoftwareUpdatesFilters,
} from '@edgeiq/edgeiq-api-js';

import TabsPage from '../../../components/TabsPage';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setAlert } from '../../../redux/reducers/alert.reducer';
import { errorHighlight } from '../../../app/constants';
import timeHelpers from '../../../helpers/timeHelpers';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Software Name',
    flex: 1,
    renderCell: (params: GridRenderCellParams): ReactElement => (
      <strong>{params.row.name}</strong>
    ),
  },
  {
    field: 'created_at',
    headerName: 'Date created',
    flex: 0.5,
    renderCell: (params: GridRenderCellParams): ReactElement => (
      <span>{timeHelpers.getPlainDate(params.row.created_at)}</span>
    ),
  },
  {
    field: 'summary',
    headerName: 'Summary',
    flex: 0.3,
  },
  { field: 'profile', headerName: 'Profile', flex: 0.3 },
];

const DeviceSoftwareUpdate: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [_open, setOpen] = useState<boolean>(false);
  //TODO: change to redux list
  const [updatesList, setUpdatesList] = useState<SoftwareUpdate[]>();
  const editableDevice = useAppSelector(
    (state: RootState) => state.devices.newDevice,
  );

  useEffect(() => {
    if (editableDevice) {
      setLoading(true);

      const filters: SoftwareUpdatesFilters = {
        device_type_id: {
          operator: 'eq',
          value: editableDevice.device_type_id,
        },
      };

      SoftwareUpdates.list(filters)
        .then((resUpdates) => {
          setUpdatesList(resUpdates.softwareUpdates);
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
        rows={updatesList}
        addButtonLabel="Update Software"
        onAddClick={(): void => setOpen(true)}
        createButtonLabel="Create Package"
        tableTitle="Software added"
        loading={loading}
      />
    </Box>
  );
};

export default DeviceSoftwareUpdate;
