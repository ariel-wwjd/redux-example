import React, { useState } from 'react';
import { Device } from '@edgeiq/edgeiq-api-js';
import {
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Box,
  Button,
  Divider,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import clsx from 'clsx';

import DeviceActivities from './deviceActivities';
import DeviceForm from './deviceForm';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setNewDevice } from '../../../redux/reducers/devices.reducer';
import useStyles from './styles';

interface DeviceDetailsProps {
  onReportFiltersChange: (value: string) => void; // Triggers when the activity filter change
}

const DeviceDetails: React.FC<DeviceDetailsProps> = ({
  onReportFiltersChange,
}) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [selectedHearbeatUnit, setSelectedHearbeatUnit] =
    useState<string>('hours');
  const editableDevice = useAppSelector(
    (state: RootState) => state.devices.newDevice,
  );

  const handleChange =
    (prop: string) =>
    (
      // eslint-disable-next-line
      event: React.ChangeEvent<HTMLInputElement> | any,
    ): void => {
      switch (prop) {
        case 'heartbeatUnit':
          return setSelectedHearbeatUnit(event.target.value);
        default:
          dispatch(
            setNewDevice({
              ...editableDevice,
              [prop]: event.target.value,
            } as Device),
          );
      }
    };

  return (
    <Grid container>
      {editableDevice && (
        <>
          <Grid item xs={8} className={clsx('p-7', classes.boxContainer)}>
            {/* Details Form */}
            <Typography variant="h5">Details</Typography>
            <DeviceForm
              device={editableDevice}
              onInputChange={handleChange}
              heartbeatUnit={selectedHearbeatUnit}
            />
            {/* Integration Form */}
            <Typography className="mt-7" variant="h5">
              Integrations
            </Typography>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6} className="mt-6">
                <Typography variant="subtitle2" className="custom-label">
                  Device Integration
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <Select
                    displayEmpty
                    value={
                      editableDevice.device_integration_id ? 'true' : 'false'
                    }
                    onChange={handleChange('active')}
                    className={clsx('mb-4', classes.filter)}
                  >
                    <MenuItem className="m-4 p-2" dense value="true">
                      Device Integration
                    </MenuItem>
                  </Select>
                </FormControl>

                <Typography
                  variant="overline"
                  component="div"
                  className={classes.integrationSubtitle}
                >
                  <InfoOutlinedIcon
                    fontSize="small"
                    className={clsx('mr-2', classes.integrationSubtitle)}
                  />
                  Can´t find one?
                  <Button
                    color="primary"
                    variant="text"
                    type="button"
                    onClick={(): boolean => true}
                    className={clsx('p-0 ml-1')}
                  >
                    <Typography variant="overline">Create a new one</Typography>
                  </Button>
                </Typography>
              </Grid>
            </Grid>
            {/* Network Form */}
            <Typography className="mt-7" variant="h5">
              Network configuration
            </Typography>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6} className="mt-6">
                <Button variant="outlined" size="large" startIcon={<AddIcon />}>
                  Add Network Configuration
                </Button>
              </Grid>
            </Grid>
            {/* Tags Form */}
            <Typography className="mt-7" variant="h5">
              Tags
            </Typography>

            <Divider />
            {/* Details footer */}
            <Box className={clsx('my-7 ', classes.rowBox)}>
              {/* TODO: Verify which info will be displayed here */}
              <Box className={clsx(classes.rowBox)}>
                <Typography className={classes.fontBold} variant="subtitle2">
                  System Id:
                </Typography>
                <Typography className="ml-1" variant="subtitle2">
                  2131123123
                </Typography>
              </Box>
              {editableDevice.edge_version && (
                <Box className={clsx(classes.rowBox)}>
                  <Typography
                    className={clsx('ml-2', classes.fontBold)}
                    variant="subtitle2"
                  >
                    Edge Version:
                  </Typography>
                  <Typography className="ml-1" variant="subtitle2">
                    {editableDevice.edge_version}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          {/* Activities section  */}
          <DeviceActivities onReportFiltersChange={onReportFiltersChange} />
        </>
      )}
    </Grid>
  );
};

export default DeviceDetails;
