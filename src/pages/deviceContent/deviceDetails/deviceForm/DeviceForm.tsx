import React, { ChangeEventHandler, ReactElement } from 'react';
import {
  Box,
  Grid,
  Typography,
  FormControl,
  OutlinedInput,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { Device } from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import timeHelpers from '../../../../helpers/timeHelpers';
import { hearbeatValuesLabel } from '../../../../app/constants';
import useStyles from './styles';

interface DeviceFormProps {
  device: Device;
  onInputChange: (
    prop: string,
    // eslint-disable-next-line
  ) => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | any;
  heartbeatUnit?: string;
}

const DeviceForm: React.FC<DeviceFormProps> = ({
  onInputChange,
  device,
  heartbeatUnit = 'hours',
}) => {
  const classes = useStyles();

  return (
    <Box>
      {/* Row 1 */}
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6} className="mt-6">
          <Typography variant="subtitle2" className="custom-label">
            Device Name
          </Typography>
          <FormControl variant="outlined" fullWidth>
            <OutlinedInput
              name="name"
              placeholder="Device Name"
              type="text"
              required={true}
              value={device.name}
              onChange={onInputChange('name')}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} className="mt-6">
          <Typography variant="subtitle2" className="custom-label">
            Location
          </Typography>
          <FormControl variant="outlined" fullWidth>
            <OutlinedInput
              name="location"
              placeholder="Location"
              type="text"
              required={true}
              value={device.location}
              onChange={onInputChange('location')}
            />
          </FormControl>
        </Grid>
      </Grid>

      {/* Row 2 */}
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6} className="mt-6">
          <Typography variant="subtitle2" className="custom-label">
            Serial Number
          </Typography>
          <FormControl variant="outlined" fullWidth>
            <OutlinedInput
              name="serial"
              placeholder="Serial Number"
              type="text"
              required={true}
              value={device.serial}
              onChange={onInputChange('serial')}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} className="mt-6">
          <Typography variant="subtitle2" className="custom-label">
            Firmware Version
          </Typography>
          <FormControl variant="outlined" fullWidth>
            <OutlinedInput
              name="firmware_version"
              placeholder="Firmware Version"
              type="text"
              required={true}
              value={device.firmware_version}
              onChange={onInputChange('firmware_version')}
            />
          </FormControl>
        </Grid>
      </Grid>

      {/* Row 3 */}
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6} className="mt-4">
          <Typography variant="subtitle2" className="custom-label">
            Heartbeat. Select reporting frequency
          </Typography>
          <Box className={clsx(classes.rowBox)}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                name="heartbeat_period"
                placeholder="Heartbeat interval"
                type="text"
                required={true}
                value={device.heartbeat_period}
                onChange={onInputChange('heartbeat_period')}
              />
            </FormControl>
            <FormControl
              variant="outlined"
              className={clsx('ml-2', classes.unitInput)}
            >
              <Select
                displayEmpty
                value={heartbeatUnit}
                onChange={onInputChange('heartbeatUnit')}
                className={clsx('mb-4', classes.filter)}
              >
                <MenuItem className="m-4 p-2" dense value="seconds">
                  Seconds
                </MenuItem>
                <MenuItem className="m-4 p-2" dense value="minutes">
                  Minutes
                </MenuItem>
                <MenuItem className="m-4 p-2" dense value="hours">
                  Hours
                </MenuItem>
                <MenuItem className="m-4 p-2" dense value="days">
                  Days
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6} className="mt-4">
          <FormControl variant="outlined" fullWidth>
            <Typography variant="subtitle2" className="custom-label">
              Optional Data
            </Typography>
            <Select
              multiple
              value={device.heartbeat_values}
              onChange={onInputChange('heartbeat_values')}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              renderValue={(selected): string[] | ReactElement => {
                if (selected?.length === 0) {
                  return <span>Optional data</span>;
                }

                if (selected?.length > 0) {
                  return <span>{`Values selected (${selected?.length})`}</span>;
                }

                return selected;
              }}
            >
              {hearbeatValuesLabel.map((item, key) => (
                <MenuItem key={key} value={item.value}>
                  <Checkbox
                    checked={
                      device.heartbeat_values
                        ? device.heartbeat_values.indexOf(item.value) > -1
                        : false
                    }
                  />
                  <ListItemText primary={item.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Row 4 */}
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6} className="mt-4">
          <Typography variant="subtitle2" className="custom-label">
            Activated at
          </Typography>
          <FormControl variant="outlined" fullWidth>
            <OutlinedInput
              name="activated_at"
              placeholder="MM/DD/YYYY"
              type="text"
              required={true}
              value={
                device.activated_at
                  ? timeHelpers.getPlainDate(device.activated_at)
                  : ''
              }
              onChange={onInputChange('activated_at')}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} className="mt-4">
          <Typography variant="subtitle2" className="custom-label">
            Deactivated at
          </Typography>
          <FormControl variant="outlined" fullWidth>
            <OutlinedInput
              name="deactivated_at"
              placeholder="MM/DD/YYYY"
              type="text"
              required={true}
              value={
                device.deactivated_at
                  ? timeHelpers.getPlainDate(device.deactivated_at)
                  : ''
              }
              onChange={onInputChange('deactivated_at')}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeviceForm;
