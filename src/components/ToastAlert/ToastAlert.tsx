import React, { useEffect } from 'react';
import {
  Typography,
  Snackbar,
  IconButton,
  useTheme,
  useMediaQuery,
  ClassNameMap,
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  InfoOutlined as InfoOutlinedIcon,
} from '@mui/icons-material';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { closeAlert } from '../../redux/reducers/alert.reducer';
import useStyles from './styles';
import { StatusTheme } from '../../models/common';

const ToastAlert: React.FC<Record<string, unknown>> = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const alert = useAppSelector((state: RootState) => state.alert);

  const classes = useStyles({ status: alert.type });
  const [open, setOpen] = React.useState(false);

  const onClose = (): void => {
    setOpen(false);
    dispatch(closeAlert(false));
  };

  useEffect(() => {
    if (alert.show) {
      setOpen(alert.show);
    }
  }, [alert]);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  const vertical = isMobile ? 'bottom' : 'top';
  const horizontal = isMobile ? 'center' : 'right';

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      className={classes.snackBar}
    >
      {renderContent(
        alert.type,
        classes,
        true,
        alert.highlight,
        alert.message,
        handleClose,
      )}
    </Snackbar>
  );
};

const renderContent = (
  type: StatusTheme,
  classes: ClassNameMap<string>,
  isToast = false,
  highlight?: string,
  message?: string,
  handleClose?: (event: React.SyntheticEvent | Event, reason?: string) => void,
): JSX.Element => (
  <div
    className={clsx('py-2 px-4 br-1', classes.contentContainer, {
      [classes.alertContainer]: !isToast,
      [classes.toastContainer]: isToast,
      ['shadow']: isToast,
    })}
  >
    <div className={classes.content}>
      {type === 'error' && (
        <WarningIcon fontSize="small" className={clsx('mr-2', classes.icon)} />
      )}
      {type === 'success' && (
        <CheckIcon fontSize="small" className={clsx('mr-2', classes.icon)} />
      )}
      {type === 'warning' && (
        <InfoOutlinedIcon
          fontSize="small"
          className={clsx('mr-2', classes.icon)}
        />
      )}
      {!isToast && (
        <Typography variant="button" className={classes.message}>
          {highlight && (
            <span className={clsx('mr-1', classes.highlight)}>
              {highlight}.
            </span>
          )}
          {message}
        </Typography>
      )}
      {isToast && (
        <div>
          {highlight && (
            <Typography
              variant="button"
              component="div"
              className={classes.highlight}
            >
              {highlight}
            </Typography>
          )}
          {message && (
            <Typography
              variant="button"
              component="div"
              className={classes.message}
            >
              {message}
            </Typography>
          )}
        </div>
      )}
    </div>
    {handleClose && (
      <IconButton
        className={clsx('ml-4', classes.clearIconBtn)}
        aria-label="close-toast"
        size="small"
        onClick={handleClose}
        edge="end"
      >
        <CloseIcon className={classes.clearIcon} />
      </IconButton>
    )}
  </div>
);

interface AlertProps {
  type: StatusTheme;
  message?: string;
  highlight?: string;
  handleClose?: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

export const Alert: React.FC<AlertProps> = ({
  type,
  message,
  highlight,
  handleClose,
}) => {
  const classes = useStyles({ status: type });
  return (
    <>{renderContent(type, classes, false, highlight, message, handleClose)}</>
  );
};

export default ToastAlert;
