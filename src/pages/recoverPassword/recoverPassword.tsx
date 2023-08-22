import React, { useState } from 'react';
import {
  Grid,
  Typography,
  FormControl,
  OutlinedInput,
  Button,
  CircularProgress,
} from '@mui/material';
import { Authentication } from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { recoverPassData } from '../../app/constants';
import { Alert } from '../../components/ToastAlert/ToastAlert';
import useStyles from '../login/styles';

const RecoverPassword: React.FC = () => {
  const classes = useStyles();

  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [values, setValues] = useState({
    email: '',
  });

  const handleChange =
    (prop: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const onSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    setSubmitting(true);
    Authentication.passwordResetRequest(
      values.email,
      '',
      recoverPassData.subject,
      recoverPassData.greeting,
    )
      .then((_result: boolean) => {
        setMailSent(true);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Typography variant="subtitle1" className={clsx('mb-9', classes.title)}>
          {mailSent ? `Check you email` : `Forgot password`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="button" component="div" className="mb-7">
          {!mailSent ? (
            <>
              Enter the email associated with your account.<br></br>
              We’ll send you an email with instructions to reset your password.
            </>
          ) : (
            `We've sent a password recovery email with instructions`
          )}
        </Typography>
      </Grid>
      {error && (
        <Grid item xs={12} className="mb-7">
          <Alert type="error" message={error} highlight="Error" />
        </Grid>
      )}
      <Grid item xs={12}>
        <form onSubmit={onSubmit} className={classes.formContainer}>
          <Typography variant="subtitle2" className="custom-label">
            Email
          </Typography>
          <FormControl variant="outlined" className="mb-7">
            <OutlinedInput
              name="email"
              placeholder="Email"
              type="text"
              required={true}
              value={values.email}
              onChange={handleChange('email')}
            />
          </FormControl>
          <Button
            className={classes.submitButton}
            color="primary"
            size="large"
            variant="contained"
            type="submit"
            disabled={submitting}
          >
            {!submitting ? (
              <Typography variant="button">Send Email</Typography>
            ) : (
              <CircularProgress size={25} />
            )}
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default RecoverPassword;
