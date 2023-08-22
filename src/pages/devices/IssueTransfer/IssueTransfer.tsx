import React, { useEffect, useState } from 'react';
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import {
  DeviceTransferRequests,
  DeviceType,
  EscrowDevice,
} from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setAlert } from '../../../redux/reducers/alert.reducer';
import { errorHighlight } from '../../../app/constants';
import { RightDrawer } from '../../../components/RightDrawer';
import AccountSelect from '../../../components/AccountSelect';
import useStyles from './styles';

interface IssueTransferDrawerProps {
  open: boolean;
  escrowDevices: EscrowDevice[];
  handleCloseDrawer: () => void;
}

const IssueTransferDrawer: React.FC<IssueTransferDrawerProps> = ({
  open,
  escrowDevices,
  handleCloseDrawer,
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const devicesState = useAppSelector((state: RootState) => state.devices);
  const { userCompanies } = useAppSelector((state: RootState) => state.user);

  const getCompanyName = (id: string): string | undefined =>
    userCompanies.find((company) => company._id === id)?.name;

  // devicesTypes of the redux state will always have a value in the flow here
  // as the user can't access this drawer without passing from the Devices page
  // So there is no need to try to get the devices types in here
  const [devicesTypes, _setDevicesTypes] = useState<DeviceType[]>(
    devicesState.devicesTypes,
  );
  const [companyId, setCompanyId] = useState('');
  const [deviceTypeId, setDeviceTypeId] = useState('');
  const [chosenDevices, setChosenDevices] = useState<EscrowDevice[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setChosenDevices(escrowDevices);
  }, [escrowDevices]);

  const handleAccountChange = (id: string): void => {
    setCompanyId(id);
  };

  const handleChangeProfile = (event: SelectChangeEvent): void => {
    setDeviceTypeId(event.target.value as string);
  };

  const handleTransfer = (): void => {
    setLoading(true);
    DeviceTransferRequests.create({
      device_type_id: deviceTypeId,
      to_company_id: companyId,
      escrow_device_ids: chosenDevices.map((device) => device._id),
    })
      .then((_result) => {
        dispatch(
          setAlert({
            type: 'success',
            highlight: 'Transfer request created correctly.',
          }),
        );
        handleCloseDrawer();
      })
      .catch((error) => {
        dispatch(
          setAlert({
            type: 'error',
            highlight: errorHighlight,
            message: error.message,
          }),
        );
      })
      .finally(() => setLoading(false));
  };

  const disabled = chosenDevices.length === 0 || !companyId || !deviceTypeId;

  return (
    <RightDrawer
      open={open}
      actionLabel="Transfer"
      title="Issue Transfer"
      disableAction={disabled}
      actionLoading={loading}
      actionCallback={handleTransfer}
      onCloseDrawer={handleCloseDrawer}
      content={
        <Grid container flexDirection="column">
          <Grid item xs={12} sm={6} className="mb-6">
            <Typography variant="subtitle2" className="custom-label">
              Select Account the devices will belong to
            </Typography>
            <AccountSelect
              id={companyId}
              onAccountChange={handleAccountChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} className="mb-6">
            <Typography variant="subtitle2" className="custom-label">
              Select a Device profile
            </Typography>
            <FormControl fullWidth className="mb-6">
              <Select
                displayEmpty
                value={deviceTypeId}
                onChange={handleChangeProfile}
              >
                <MenuItem dense value="">
                  Device profile
                </MenuItem>
                {devicesTypes.map((deviceType, index) => (
                  <MenuItem dense key={index} value={deviceType._id}>
                    {deviceType.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" className="custom-label mb-6">
              {`Escrow devices to be transferred (${chosenDevices.length})`}
            </Typography>
            {chosenDevices.map((device) => (
              <div
                key={device._id}
                className={clsx('mb-2 br-1 p-4', classes.deviceContainer)}
              >
                <Typography variant="subtitle2">
                  ID: {device.unique_id}
                </Typography>
                <Typography variant="subtitle2">
                  Token: {device.token}
                </Typography>
                <Typography variant="subtitle2">
                  {getCompanyName(device.company_id)}
                </Typography>
              </div>
            ))}
          </Grid>
        </Grid>
      }
    />
  );
};

export default IssueTransferDrawer;
