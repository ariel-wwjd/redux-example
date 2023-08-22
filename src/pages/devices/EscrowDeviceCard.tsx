import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import {
  Key as KeyIcon,
  SwapHoriz as SwapHorizIcon,
} from '@mui/icons-material';
import { EscrowDevice } from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import useStyles from './styles';

interface EscrowDeviceCardProps {
  escrowDevice: EscrowDevice;
  onClick?: (escrowDevice: EscrowDevice) => void;
}

const EscrowDeviceCard: React.FC<EscrowDeviceCardProps> = ({
  escrowDevice,
  // onClick,
}) => {
  const classes = useStyles();
  return (
    <Box>
      <Typography
        variant="button"
        component="div"
        className={clsx('mb-4', classes.title)}
      >
        ID: {escrowDevice.unique_id}
      </Typography>
      <Tooltip placement="top" title="Token">
        <Typography
          variant="overline"
          component="div"
          className={clsx('mb-1', classes.tag)}
        >
          <KeyIcon fontSize="small" className="mr-2" />
          {escrowDevice.token}
        </Typography>
      </Tooltip>
      <Tooltip placement="top" title="Transfer Status">
        <Typography
          variant="overline"
          component="div"
          className={clsx('mb-1', classes.tag)}
        >
          <SwapHorizIcon fontSize="small" className="mr-2" />
          {escrowDevice.transfer_initiated_at
            ? 'Device transfer initiated'
            : escrowDevice.transfer_completed_at
            ? 'Device transfer completed'
            : 'Device transfer not yet initiated'}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default EscrowDeviceCard;
