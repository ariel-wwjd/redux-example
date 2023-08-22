import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import {
  PlaylistAddCheckOutlined as CheckListIcon,
  Timelapse as TimelapseIcon,
} from '@mui/icons-material';
import { PollableAttribute } from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { pollableAttributeTypesMap } from '../../../app/constants';
import useStyles from '../styles';

interface PollableAttributeCardProps {
  pollableAttribute: PollableAttribute;
}

const PollableAttributeCard: React.FC<PollableAttributeCardProps> = ({
  pollableAttribute,
}) => {
  const classes = useStyles();
  const { userCompanies } = useAppSelector((state: RootState) => state.user);
  const company = userCompanies?.find(
    (company) => company._id === pollableAttribute.company_id,
  );

  return (
    <Box>
      <Tooltip placement="top" title={pollableAttribute.name}>
        <Typography
          variant="button"
          component="div"
          noWrap
          className={clsx('mb-2', classes.title)}
        >
          {pollableAttribute.name}
        </Typography>
      </Tooltip>
      <Tooltip placement="top" title="Type">
        <Typography
          variant="overline"
          component="div"
          className={clsx('mb-1', classes.tag)}
        >
          <CheckListIcon fontSize="medium" className="mr-2" />
          {pollableAttributeTypesMap[pollableAttribute.type]}
        </Typography>
      </Tooltip>
      <Tooltip placement="top" title="Interval">
        <Typography
          variant="overline"
          component="div"
          className={clsx('mb-1', classes.tag)}
        >
          <TimelapseIcon fontSize="medium" className="mr-2" />
          {pollableAttribute.interval}
        </Typography>
      </Tooltip>
      {company && (
        <Tooltip placement="top" title="Account">
          <Typography
            variant="overline"
            component="div"
            className={classes.tag}
          >
            {company.branding?.logo_url && (
              <img src={company.branding.logo_url} className="card-logo" />
            )}
            {company.name}
          </Typography>
        </Tooltip>
      )}
    </Box>
  );
};

export default PollableAttributeCard;
