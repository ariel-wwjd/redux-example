import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { PlaylistAddCheckOutlined as CheckListIcon } from '@mui/icons-material';
import { Integration } from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { integrationTypesMap } from '../../../app/constants';
import useStyles from '../styles';

interface IntegrationCardProps {
  integration: Integration;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration }) => {
  const classes = useStyles();
  const { userCompanies } = useAppSelector((state: RootState) => state.user);
  const company = userCompanies?.find(
    (company) => company._id === integration.company_id,
  );

  return (
    <Box>
      <Tooltip placement="top" title={integration.name}>
        <Typography
          variant="button"
          component="div"
          noWrap
          className={clsx('mb-2', classes.title)}
        >
          {integration.name}
        </Typography>
      </Tooltip>
      <Tooltip placement="top" title="Type">
        <Typography
          variant="overline"
          component="div"
          className={clsx('mb-1', classes.tag)}
        >
          <CheckListIcon fontSize="medium" className="mr-2" />
          {integrationTypesMap[integration.type]}
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

export default IntegrationCard;
