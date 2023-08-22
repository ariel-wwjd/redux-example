import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { SwapHoriz as SwapHorizIcon } from '@mui/icons-material';
import { Translator } from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { translatorTypesMap } from '../../../app/constants';
import useStyles from '../styles';

interface TranslatorCardProps {
  translator: Translator;
}

const TranslatorCard: React.FC<TranslatorCardProps> = ({ translator }) => {
  const classes = useStyles();
  const { userCompanies } = useAppSelector((state: RootState) => state.user);
  const company = userCompanies?.find(
    (company) => company._id === translator.company_id,
  );

  return (
    <Box>
      <Tooltip placement="top" title={translator.name}>
        <Typography
          variant="button"
          component="div"
          noWrap
          className={clsx('mb-2', classes.title)}
        >
          {translator.name}
        </Typography>
      </Tooltip>
      <Tooltip placement="top" title="Translator">
        <Typography
          variant="overline"
          component="div"
          className={clsx('mb-2', classes.tag)}
        >
          <SwapHorizIcon fontSize="medium" className="mr-2" />
          {translatorTypesMap[translator.type]}
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

export default TranslatorCard;
