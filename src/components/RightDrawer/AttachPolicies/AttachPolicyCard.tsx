import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import FiberSmartRecordIcon from '@mui/icons-material/FiberSmartRecord';
import { Rule } from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import useStyles from '../styles';

interface AttachPolicyCardProps {
  policy: Rule;
}

const AttachPolicyCard: React.FC<AttachPolicyCardProps> = ({ policy }) => {
  const classes = useStyles();
  return (
    <>
      <Tooltip placement="top" title={policy.description}>
        <Typography
          variant="button"
          component="div"
          noWrap
          className={clsx('mb-2', classes.cardTitle)}
        >
          {policy.description}
        </Typography>
      </Tooltip>
      <Typography
        variant="overline"
        component="div"
        className={clsx('mb-1', classes.tag)}
      >
        <FiberSmartRecordIcon fontSize="small" className="mr-2" />
        {policy.active ? 'Active' : 'Inactive'}
      </Typography>
    </>
  );
};

export default AttachPolicyCard;
