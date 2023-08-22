import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

import useStyles from './styles';

interface BasicDialogProps {
  open: boolean; // Status of the dialog (dafault: false)
  onClose?: () => void; // Trigger when the dialog is closing
  title?: JSX.Element | string; // Header part of the dialog
  content?: JSX.Element | string; // Main part of the dialog, use it to insert most of the information
  actions?: JSX.Element | string; // Bottom part of the dialog, use it to insert the actions
}

const BasicDialog: React.FC<BasicDialogProps> = ({
  open = false,
  onClose,
  title,
  content,
  actions,
}) => {
  const classes = useStyles();

  return (
    <Dialog className={clsx('p-6')} open={open} onClose={onClose}>
      <DialogTitle>
        {typeof title === 'string' ? (
          <Typography variant="h6">{title}</Typography>
        ) : (
          title
        )}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            className={clsx(classes.closeIcon)}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        {typeof content === 'string' ? (
          <Typography className={clsx(classes.content)} variant="button">
            {content}
          </Typography>
        ) : (
          content
        )}
      </DialogContent>
      <DialogActions className="p-6">{actions}</DialogActions>
    </Dialog>
  );
};

export default BasicDialog;
