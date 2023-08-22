import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import {
  HearingOutlined as HearingIcon,
  PlaylistAddCheckOutlined as CheckListIcon,
  SwapHoriz as SwapHorizIcon,
} from '@mui/icons-material';
import { Ingestor, Translator } from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import {
  ingestorHandlerTypesMap,
  ingestorListenerTypesMap,
} from '../../../app/constants';
import useStyles from '../styles';

interface IngestorCardProps {
  ingestor: Ingestor;
  translator?: Translator;
}

const IngestorCard: React.FC<IngestorCardProps> = ({
  ingestor,
  translator,
}) => {
  console.log({ ingestor });
  const classes = useStyles();
  const { userCompanies } = useAppSelector((state: RootState) => state.user);
  const company = userCompanies?.find(
    (company) => company._id === ingestor.company_id,
  );

  return (
    <Box>
      <Tooltip placement="top" title={ingestor.name}>
        <Typography
          variant="button"
          component="div"
          noWrap
          className={clsx('mb-2', classes.title)}
        >
          {ingestor.name}
        </Typography>
      </Tooltip>
      <Tooltip placement="top" title="Listener type">
        <Typography
          variant="overline"
          component="div"
          className={clsx('mb-1', classes.tag)}
        >
          <HearingIcon fontSize="medium" className="mr-2" />
          {ingestorListenerTypesMap[ingestor.listener_type]}
        </Typography>
      </Tooltip>
      <Tooltip placement="top" title="Handler type">
        <Typography
          variant="overline"
          component="div"
          className={clsx('mb-2', classes.tag)}
        >
          <CheckListIcon fontSize="medium" className="mr-2" />
          {ingestorHandlerTypesMap[ingestor.handler_type]}
        </Typography>
      </Tooltip>
      <Tooltip placement="top" title="Translator">
        <Typography
          variant="overline"
          component="div"
          className={clsx('mb-2', classes.tag)}
        >
          <SwapHorizIcon fontSize="medium" className="mr-2" />
          {translator?.name}
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

export default IngestorCard;
