import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import {
  Devices as DevicesIcon,
  ListAlt as ListIcon,
  TurnedInNotOutlined as TurnedInIcon,
  AccountCircleOutlined as AccountIcon,
} from '@mui/icons-material';
import { Company, DeviceType } from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { profileTypesMap } from '../../app/constants';
import useStyles from './styles';

interface DeviceCardProps {
  deviceType: DeviceType;
  company?: Company;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ deviceType, company }) => {
  const classes = useStyles();
  return (
    <Box>
      <Typography
        variant="h5"
        component="div"
        noWrap
        className={clsx('mb-4 pb-4', classes.title)}
      >
        {deviceType.name}
      </Typography>
      <Typography
        variant="button"
        component="div"
        className={clsx('mb-4', classes.subtitle)}
      >
        {deviceType.long_description}
      </Typography>
      <div className={clsx('mb-3', classes.accountContainer)}>
        <Tooltip title="Account" placement="bottom">
          <AccountIcon fontSize="small" className={classes.tagIcon} />
        </Tooltip>
        <Typography
          variant="overline"
          component="div"
          className={clsx('ml-2', classes.tagValue)}
        >
          {company?.name}
        </Typography>
      </div>
      <div className={classes.tagsContainer}>
        <div className={classes.tagContainer}>
          <TurnedInIcon fontSize="small" className={classes.tagIcon} />
          <div className="ml-2">
            <Typography
              variant="overline"
              component="div"
              className={classes.tagName}
            >
              Manufacturer
            </Typography>
            <Typography
              variant="overline"
              component="div"
              className={classes.tagValue}
            >
              {deviceType.manufacturer}
            </Typography>
          </div>
        </div>
        <div className={classes.tagContainer}>
          <ListIcon fontSize="small" className={classes.tagIcon} />
          <div className="ml-2">
            <Typography
              variant="overline"
              component="div"
              className={classes.tagName}
            >
              Model
            </Typography>
            <Typography
              variant="overline"
              component="div"
              className={classes.tagValue}
            >
              {deviceType.model}
            </Typography>
          </div>
        </div>
        <div className={classes.tagContainer}>
          <DevicesIcon fontSize="small" className={classes.tagIcon} />
          <div className="ml-2">
            <Typography
              variant="overline"
              component="div"
              className={classes.tagName}
            >
              Device Type
            </Typography>
            <Typography
              variant="overline"
              component="div"
              className={classes.tagValue}
            >
              {profileTypesMap[deviceType.type]}
            </Typography>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default DeviceCard;
