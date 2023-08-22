import React from 'react';
import { Box, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import clsx from 'clsx';

import BasicDialog from '../BasicDialog';
import useStyles from './styles';

interface DeleteDialogProps {
  open: boolean;
  loading: boolean;
  title?: string;
  content?: string | JSX.Element;
  onCloseCallback: () => void;
  onDeleteCallback: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  loading,
  title = 'Are you sure?',
  content = 'You are about to delete this item',
  onCloseCallback,
  onDeleteCallback,
}) => {
  const classes = useStyles();

  const handleCancel = (): void => {
    onCloseCallback();
  };

  const handleDelete = (): void => {
    onDeleteCallback();
  };

  return (
    <BasicDialog
      open={open}
      onClose={handleCancel}
      title={title}
      content={content}
      actions={
        <Box className={clsx(classes.container)}>
          <Button
            size="large"
            variant="outlined"
            onClick={handleCancel}
            fullWidth
          >
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            fullWidth
            size="large"
            variant="outlined"
            color="error"
            className={clsx('ml-6', classes.button)}
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
        </Box>
      }
    />
  );
};

export default DeleteDialog;
