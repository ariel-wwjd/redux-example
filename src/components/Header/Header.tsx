import React, { ReactElement } from 'react';
import { To, useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import clsx from 'clsx';

import { PermissionAction } from '../../models/common';
import ActionButton from '../ActionButton';
import useStyles from './styles';

interface HeaderProps {
  title: string; // Main title of the header
  actionLabel?: string; // Label of the main button
  actionType?: PermissionAction;
  actionIcon?: ReactElement; // Optional icon for the main button
  extraActions?: ReactElement; // Any other component that needs to be placed in the left size of the main button
  nextTitleContent?: ReactElement;
  model?: string;
  link?: string;
  goBack?: To;
  actionCallback?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  actionLabel,
  actionIcon,
  extraActions,
  nextTitleContent,
  model,
  link,
  goBack,
  actionCallback,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      className={clsx('pt-9 px-8 pb-6 shadow', classes.container)}
    >
      {goBack && (
        <Button
          className={classes.backButton}
          color="inherit"
          variant="text"
          type="button"
          startIcon={<KeyboardBackspaceIcon />}
          onClick={(): void => navigate(`/${goBack}`)}
        >
          <Typography variant="button">{`Back to ${goBack}`}</Typography>
        </Button>
      )}
      {!goBack && (
        <>
          <div className={classes.titleContainer}>
            <Typography variant="h4">{title}</Typography>
            {nextTitleContent && nextTitleContent}
          </div>
          <div className={classes.actionContainer}>
            {extraActions}
            {model && (
              <ActionButton
                model={model}
                action={'create'}
                label={actionLabel}
                link={link}
                actionIcon={actionIcon}
                actionCallback={actionCallback}
              />
            )}
          </div>
        </>
      )}
    </Grid>
  );
};

export default Header;
