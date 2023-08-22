import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import { Command } from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import useStyles from '../styles';

interface IssueCommandCardProps {
  command: Command;
}

const IssueCommandCard: React.FC<IssueCommandCardProps> = ({ command }) => {
  const classes = useStyles();
  return (
    <>
      <Tooltip placement="top" title={command.name}>
        <Typography
          variant="button"
          component="div"
          noWrap
          className={clsx('mb-2', classes.cardTitle)}
        >
          {command.name}
        </Typography>
      </Tooltip>
      <Typography
        variant="overline"
        component="div"
        className={clsx('mb-1', classes.tag)}
      >
        Sender type: {command.sender_type.split('_')[0].toUpperCase()}
      </Typography>
    </>
  );
};

export default IssueCommandCard;
