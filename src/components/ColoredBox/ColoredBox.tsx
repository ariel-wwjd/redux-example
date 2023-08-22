import React from 'react';
import { Typography } from '@mui/material';
import clsx from 'clsx';

import { heartBeatStatusLabel, activityLabel } from '../../app/constants';
import { StatusTheme } from '../../models/common';
import useStyles from './styles';

interface ColoredBoxProps {
  type: string;
  value: string;
  colorTheme: StatusTheme;
  className?: string;
}

const ColoredBox: React.FC<ColoredBoxProps> = ({
  type,
  value,
  colorTheme,
  className,
}) => {
  const classes = useStyles({ status: colorTheme });
  return (
    <div className={clsx('px-2 py-1 br-1', classes.container, className)}>
      <Typography variant="caption" className={classes.label}>
        {type === 'heartbeat_status' ? heartBeatStatusLabel[value] : ''}
        {type === 'activity' ? activityLabel[value] : ''}
      </Typography>
    </div>
  );
};

export default ColoredBox;
