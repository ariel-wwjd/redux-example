import React from 'react';
import {
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

import useStyles from './styles';

interface RightDrawerProps {
  open: boolean;
  title: string;
  content: JSX.Element;
  actionLabel: string;
  disableAction: boolean;
  actionLoading?: boolean;
  actionCallback: () => void;
  onCloseDrawer: () => void;
}

const RightDrawer: React.FC<RightDrawerProps> = ({
  open,
  title,
  content,
  actionLabel,
  disableAction,
  actionLoading = false,
  actionCallback,
  onCloseDrawer,
}) => {
  const classes = useStyles();

  const toggleDrawer = (
    event: React.KeyboardEvent | React.MouseEvent,
  ): void => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    onCloseDrawer();
  };

  return (
    <Drawer anchor="right" open={open}>
      <div className={classes.container}>
        <div className={clsx('px-9 pt-9 mb-6', classes.header)}>
          <Typography variant="h4" component="span">
            {title}
          </Typography>
          <IconButton aria-label="close-drawer" onClick={toggleDrawer}>
            <CloseIcon className={classes.closeDrawerIcon} />
          </IconButton>
        </div>
        <div className={clsx('px-9', classes.content)}>{content}</div>
        <div className={clsx('p-4', classes.footer)}>
          <Button
            variant="text"
            type="button"
            color="primary"
            onClick={toggleDrawer}
          >
            <Typography variant="button">Cancel</Typography>
          </Button>
          <Button
            color="primary"
            size="large"
            variant="contained"
            type="button"
            disabled={disableAction || actionLoading}
            onClick={actionCallback}
          >
            {!actionLoading ? (
              <Typography variant="button">{actionLabel}</Typography>
            ) : (
              <CircularProgress size={25} />
            )}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default RightDrawer;
