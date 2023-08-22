import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';
import FiberSmartRecordIcon from '@mui/icons-material/FiberSmartRecord';
import { Device, DeviceType } from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { heartbeatColorThemeMap } from '../../app/constants';
import ColoredBox from '../../components/ColoredBox';
import useStyles from './styles';

interface DeviceCardProps {
  device: Device;
  deviceType?: DeviceType;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, deviceType }) => {
  const classes = useStyles();
  return (
    <Box>
      <Tooltip placement="top" title={device.name}>
        <Typography
          variant="button"
          component="div"
          noWrap
          className={clsx('mb-1', classes.title)}
        >
          {device.name}
        </Typography>
      </Tooltip>
      <Typography
        variant="button"
        component="div"
        className={clsx('mb-4', classes.subtitle)}
      >
        Id: {device.unique_id}
      </Typography>
      <Typography
        variant="overline"
        component="div"
        className={clsx('mb-1', classes.tag)}
      >
        <DevicesIcon fontSize="small" className="mr-2" />
        {deviceType?.name}
      </Typography>
      <Typography
        variant="overline"
        component="div"
        className={clsx('mb-1', classes.tag)}
      >
        <FiberSmartRecordIcon fontSize="small" className="mr-2" />
        {device.active ? 'Active' : 'Inactive'}
      </Typography>
      {device.heartbeat_status && (
        <div className={classes.statusContainer}>
          <ColoredBox
            type="heartbeat_status"
            value={device.heartbeat_status}
            colorTheme={heartbeatColorThemeMap[device.heartbeat_status]}
          />
        </div>
      )}
    </Box>
  );
};

export default DeviceCard;
