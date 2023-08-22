import React, { useState } from 'react';
import {
  Grid,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import useStyles from '../login/styles';

const ResetPassword: React.FC = () => {
  const classes = useStyles();
  const [_loginError, setLoginError] = useState(false);
  const [submitting, _setSubmitting] = useState(false);
  const [values, setValues] = useState({
    password: '',
    passwordConfirm: '',
    showPassword: false,
    showPasswordConfirm: false,
  });

  const handleChange =
    (prop: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = (): void => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowPasswordConfirm = (): void => {
    setValues({
      ...values,
      showPasswordConfirm: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event.preventDefault();
  };

  const onSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    setLoginError(false);
    // TODO: reset password in package
  };

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Typography variant="subtitle1" className={classes.title}>
          Reset password
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={onSubmit} className={classes.formContainer}>
          <Typography variant="subtitle2" className="custom-label">
            Password
          </Typography>
          <FormControl variant="outlined" className="mb-7">
            <OutlinedInput
              name="password"
              placeholder="New Password"
              type={values.showPassword ? 'text' : 'password'}
              required={true}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Typography variant="subtitle2" className="custom-label">
            Repeat Password
          </Typography>
          <FormControl variant="outlined" className="mb-7">
            <OutlinedInput
              name="passwordConfirm"
              placeholder="Confirm new password"
              type={values.showPassword ? 'text' : 'password'}
              required={true}
              value={values.showPasswordConfirm}
              onChange={handleChange('passwordConfirm')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordConfirm}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPasswordConfirm ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
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
              <Typography variant="button">Change Password</Typography>
            ) : (
              <CircularProgress size={25} />
            )}
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
