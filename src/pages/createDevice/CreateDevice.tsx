import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  FormControl,
  OutlinedInput,
  Typography,
  // Button,
} from '@mui/material';
import {
  DeviceInput,
  Devices,
  EscrowDeviceInput,
  EscrowDevices,
} from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

// import Header from '../../components/Header';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { setAlert } from '../../redux/reducers/alert.reducer';
import { errorHighlight } from '../../app/constants';
import SideTabs from '../../components/SideTabs';
import DeviceTags from '../../components/DeviceTags';
import Publish from '../../components/Publish';
import ProfileConfig from './ProfileConfig';
import HeartbeatConfig from './HeartbeatConfig';
import NewDevicePolicies from './NewDevicePolicies';
import useStyles from './styles';
import DevicesGenre from '../devices/DevicesGenre';

const EmptyDevice: DeviceInput = {
  company_id: '',
  unique_id: '',
  device_type_id: '',
  name: '',
  serial: '',
};

const EmptyEscrowDevice: EscrowDeviceInput = {
  company_id: '',
  unique_id: '',
  lwm2m: false,
  token: '',
};

const CreateDevicePage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const devicesState = useAppSelector((state: RootState) => state.devices);
  const isActive = devicesState.devicesGenre === 'active';
  // const isEscrow = devicesState.devicesGenre === 'escrow';
  const { selectedPolicies } = useAppSelector(
    (state: RootState) => state.policies,
  );

  const [newDevice, setNewDevice] = useState<DeviceInput>(EmptyDevice);
  const [newEscrowDevice, setNewEscrowDevice] =
    useState<EscrowDeviceInput>(EmptyEscrowDevice);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const checkSubmitEnable = (): void => {
    if (isActive) {
      setEnableSubmit(
        newDevice.name !== '' &&
          newDevice.unique_id !== '' &&
          newDevice.device_type_id !== '' &&
          newDevice.company_id !== '',
      );
    } else {
      setEnableSubmit(
        newEscrowDevice.unique_id !== '' &&
          newEscrowDevice.token !== '' &&
          newEscrowDevice.company_id !== '',
      );
    }
  };

  useEffect(() => {
    checkSubmitEnable();
  }, [newDevice, newEscrowDevice, devicesState.devicesGenre]);

  const handleChange =
    (prop: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setNewDevice({ ...newDevice, [prop]: event.target.value });
    };

  const handleEscrowChange =
    (prop: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setNewEscrowDevice({ ...newEscrowDevice, [prop]: event.target.value });
    };

  const handleDeviceChange = (
    prop: string,
    value: string | number | string[],
  ): void => {
    if (isActive) {
      setNewDevice({ ...newDevice, [prop]: value });
    } else {
      setNewEscrowDevice({ ...newEscrowDevice, [prop]: value });
    }
  };

  const handleOnAccountChange = (companyId: string): void => {
    handleDeviceChange('company_id', companyId);
  };

  const handlePublishSubmit = (): void => {
    setSubmitting(true);
    if (isActive) {
      Devices.create(newDevice)
        .then((deviceCreated) => {
          if (selectedPolicies.length !== 0) {
            return Devices.bulkAttachRules(
              deviceCreated._id,
              selectedPolicies.map((policy) => policy._id),
            );
          }
        })
        .then((_result) => {
          dispatch(
            setAlert({
              type: 'success',
              highlight: 'Device created correctly',
            }),
          );
          navigate('/devices');
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
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      EscrowDevices.create(newEscrowDevice)
        .then((_deviceCreated) => {
          dispatch(
            setAlert({
              type: 'success',
              highlight: 'Escrow device created correctly',
            }),
          );
          navigate('/devices');
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
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <Grid container direction="row" spacing={3} className="p-9">
      <Grid item xs={8}>
        <Grid container direction="column" spacing={3}>
          <Grid item xs={12}>
            <Paper className="shadow p-8">
              <div className={clsx('mb-6', classes.titleContainer)}>
                <Typography variant="h5" className={classes.title}>
                  Create a new device
                </Typography>
                <DevicesGenre checkCreation={true} />
              </div>
              {isActive && (
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    name="name"
                    placeholder="Device name *"
                    type="text"
                    required={true}
                    value={newDevice.name}
                    onChange={handleChange('name')}
                  />
                </FormControl>
              )}
              <Grid container direction="row" spacing={2}>
                <Grid item xs={6} className="mt-6">
                  <Typography variant="subtitle2" className="custom-label">
                    Unique ID *
                  </Typography>
                  <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                      name="unique_id"
                      placeholder="Unique ID *"
                      type="text"
                      required={true}
                      value={
                        isActive
                          ? newDevice.unique_id
                          : newEscrowDevice.unique_id
                      }
                      onChange={
                        isActive
                          ? handleChange('unique_id')
                          : handleEscrowChange('unique_id')
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} className="mt-6">
                  <Typography variant="subtitle2" className="custom-label">
                    {isActive ? 'Serial number' : 'Token *'}
                  </Typography>
                  <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                      name={isActive ? 'serial' : 'token'}
                      placeholder={
                        isActive ? 'Serial No., SN, or S/N' : 'Token *'
                      }
                      type="text"
                      required={!isActive}
                      value={
                        isActive ? newDevice.serial : newEscrowDevice.token
                      }
                      onChange={
                        isActive
                          ? handleChange('serial')
                          : handleEscrowChange('token')
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {isActive && (
            <Grid item xs={12}>
              <Paper className="shadow p-8">
                <Typography variant="h5" className={classes.title}>
                  Configuration
                </Typography>
                <SideTabs
                  tabs={{
                    profiles: (
                      <ProfileConfig
                        deviceTypeId={newDevice.device_type_id}
                        onChangeDeviceType={handleDeviceChange}
                      />
                    ),
                    integration: <span>Integration</span>,
                    config: <span>Network Config</span>,
                    policies: <NewDevicePolicies />,
                    heartbeat: (
                      <HeartbeatConfig
                        heartbeatPeriod={newDevice.heartbeat_period}
                        heartbeatValues={newDevice.heartbeat_values}
                        onChangePeriod={handleDeviceChange}
                        onChangeValues={handleDeviceChange}
                      />
                    ),
                    tags: (
                      <DeviceTags
                        deviceTags={newDevice.tags ?? []}
                        onChangeDeviceTags={handleDeviceChange}
                      />
                    ),
                  }}
                  defaultTab="profiles"
                />
              </Paper>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Publish
          label="device"
          submitting={submitting}
          companyId={
            isActive ? newDevice.company_id : newEscrowDevice.company_id
          }
          onChangeAccount={handleOnAccountChange}
          onSubmit={handlePublishSubmit}
          enableSubmit={enableSubmit}
        />
      </Grid>
    </Grid>
  );
};

export default CreateDevicePage;
