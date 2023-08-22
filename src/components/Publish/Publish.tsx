import React from 'react';
import { Button, CircularProgress, Paper, Typography } from '@mui/material';
import clsx from 'clsx';

import useStyles from './styles';
import AccountSelect from '../AccountSelect';

interface PublishProps {
  label: string;
  enableSubmit: boolean;
  submitting: boolean;
  companyId: string;
  onChangeAccount: (companyId: string) => void;
  onSubmit: () => void;
}

const Publish: React.FC<PublishProps> = ({
  label,
  enableSubmit,
  submitting,
  companyId,
  onChangeAccount,
  onSubmit,
}) => {
  const classes = useStyles();

  const handleAccountChange = (id: string): void => {
    onChangeAccount(id);
  };

  return (
    <Paper className={clsx('shadow p-8', classes.container)}>
      <Typography variant="h5" className="mb-2">
        Publish
      </Typography>
      <Typography
        variant="overline"
        component="div"
        className={clsx('mb-6', classes.label)}
      >
        Select the account the {label} will belong to
      </Typography>
      <AccountSelect id={companyId} onAccountChange={handleAccountChange} />
      <Button
        className={clsx('mt-6', classes.button)}
        color="primary"
        size="large"
        variant="contained"
        type="button"
        disabled={!enableSubmit || submitting}
        onClick={onSubmit}
      >
        {!submitting ? (
          <Typography variant="button">Create</Typography>
        ) : (
          <CircularProgress size={25} />
        )}
      </Button>
    </Paper>
  );
};

export default Publish;
