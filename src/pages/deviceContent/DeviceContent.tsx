import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Button, Box } from '@mui/material';
import { Devices, DeviceTypes, Device } from '@edgeiq/edgeiq-api-js';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import {
  getDeviceSelector,
  setActualDevice,
  setActualDeviceType,
} from '../../redux/reducers/devices.reducer';
import { setAlert } from '../../redux/reducers/alert.reducer';
import Header from '../../components/Header';
import ContentHeader from '../../components/ContentHeader';
import VerticalTabs from '../../components/VerticalTabs';
import {
  heartbeatColorThemeMap,
  deviceDetailsTabsLabel,
  errorHighlight,
} from '../../app/constants';
import FooterBar from '../../components/FooterBar';
import DeleteDialog from '../../components/DeleteDialog';
import DeviceImage from '../../assets/device-image.jpg';
import DeviceDetails from './deviceDetails';
import DeviceIngestors from './deviceIngestors';
import DevicePolicies from './devicePolicies';
import DeviceCommands from './deviceCommands';
import DeviceSoftwareUpdate from './deviceSoftwareUpdate';
import DeviceMetadata from './deviceMetadata';
import useStyles from './styles';

const DeviceContent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { id } = useParams<string>();

  const deviceData = useAppSelector((state: RootState) =>
    getDeviceSelector(state.devices, id),
  );
  const deviceTypeData = useAppSelector(
    (state: RootState) => state.devices.deviceType,
  );
  const deviceCompany = useAppSelector(
    (state: RootState) => state.user.userCompany,
  );
  const newDevice = useAppSelector(
    (state: RootState) => state.devices.newDevice,
  );
  const [deleteDeviceModalOpen, setDeleteDeviceModalOpen] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (deviceData) {
      dispatch(setActualDevice(deviceData));
    } else if (id) {
      Devices.getOneById(id)
        .then((response) => {
          dispatch(setActualDevice(response));
          return DeviceTypes.getOneById(response.device_type_id);
        })
        .then((deviceTypeResponse) => {
          dispatch(setActualDeviceType(deviceTypeResponse));
        })
        .catch((err) => {
          dispatch(
            setAlert({
              type: 'error',
              highlight: errorHighlight,
              message: err.message,
            }),
          );
        });
    }
  }, [deviceData]);

  const handleReportFilterChange = (value: string): void => {
    console.info('value', value);
  };

  const handleDeleteDevice = (): void => {
    if (!deviceData) {
      return;
    }
    setLoading(true);
    Devices.delete(deviceData._id)
      .then(() => {
        dispatch(
          setAlert({
            type: 'success',
            highlight: 'Delete device',
            message: 'Device successfully deleted.',
          }),
        );
        navigate('/devices');
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
  };

  const handleSaveChanges = (): void => {
    if (newDevice !== deviceData) {
      setLoading(true);
      Devices.update(newDevice as Device)
        .then((response) => {
          dispatch(setActualDevice(response));
          dispatch(
            setAlert({
              type: 'success',
              highlight: 'Update device',
              message: 'Device successfully updated.',
            }),
          );
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
  };

  const closeDeleteModal = (): void => {
    setDeleteDeviceModalOpen(false);
  };

  return (
    <Grid container direction="column" spacing={0}>
      <Header title="Devices content" goBack="devices" model="device" />
      {deviceData && deviceTypeData && (
        <Box>
          <ContentHeader
            title={deviceData.name}
            image={DeviceImage}
            contentType="device"
            profileName={deviceTypeData.name}
            profileType={deviceTypeData.type}
            tag={deviceData.heartbeat_status}
            tagTheme={heartbeatColorThemeMap}
            subtitle={deviceData.unique_id}
            extraImage={deviceCompany?.branding?.logo_url}
            extraTitle={deviceCompany?.name}
            extraSubtitle={deviceCompany?._id}
          />

          <VerticalTabs
            tabs={{
              details: (
                <DeviceDetails
                  onReportFiltersChange={handleReportFilterChange}
                />
              ),
              ingestors: <DeviceIngestors />,
              policies: <DevicePolicies />,
              commands: <DeviceCommands />,
              softwareUpdate: <DeviceSoftwareUpdate />,
              metadata: <DeviceMetadata />,
              relations: <span>relations</span>,
            }}
            defaultTab="details"
            tabsLabel={deviceDetailsTabsLabel}
          />
        </Box>
      )}

      <FooterBar
        initialElements={
          <Button
            color="error"
            variant="outlined"
            size="large"
            startIcon={<DeleteIcon />}
            onClick={(): void => setDeleteDeviceModalOpen(true)}
            className={classes.errorButton}
          >
            Delete
          </Button>
        }
        endElements={
          <LoadingButton
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            onClick={handleSaveChanges}
            disabled={newDevice === deviceData}
            loading={loading}
          >
            Save changes
          </LoadingButton>
        }
      />

      <DeleteDialog
        open={deleteDeviceModalOpen}
        loading={loading}
        title="Are you sure?"
        content="You are about to delete this device"
        onCloseCallback={closeDeleteModal}
        onDeleteCallback={handleDeleteDevice}
      />
    </Grid>
  );
};

export default DeviceContent;
