import React, { useState } from 'react';
import { useNavigate } from 'react-router';
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
import {
  Authentication,
  Companies,
  CompaniesFilters,
  EIQLoginUser,
  UserType,
  UserTypes,
} from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import {
  setUserCompanies,
  setUserCompany,
  setUserData,
  setUserType,
} from '../../redux/reducers/user.reducer';
import { useAppDispatch } from '../../redux/hooks';
import { errorsMessages } from '../../app/constants';
import { Alert } from '../../components/ToastAlert/ToastAlert';
import useStyles from './styles';

const Login: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
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

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event.preventDefault();
  };

  const onSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    setSubmitting(true);
    Authentication.login(values.email, values.password)
      .then((user: EIQLoginUser) => {
        if (user.session_token) {
          dispatch(setUserData(user));
          const filters: CompaniesFilters = {};
          if (user.company_ids) {
            filters._id = {
              operator: 'in',
              value: user.company_ids,
            };
          } else {
            filters._id = {
              operator: 'eq',
              value: user.company_id,
            };
          }
          Companies.list(filters, { itemsPerPage: 1000, page: 1 })
            .then((result) => {
              if (result.companies.length === 1) {
                dispatch(setUserCompany(result.companies[0]));
              } else if (result.companies.length !== 0) {
                dispatch(
                  setUserCompany(
                    result.companies.filter(
                      (company) => user.company_id === company._id,
                    )[0],
                  ),
                );
                dispatch(setUserCompanies(result.companies));
              }
              return UserTypes.getOneById(user.user_type_id);
            })
            .then((userType: UserType) => {
              dispatch(setUserType(userType));
            });

          navigate('/dashboard');
        }
      })
      .catch((error) => {
        if (errorsMessages[error.message]) {
          setError(errorsMessages[error.message]);
        } else {
          setError(error.message);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const goToForgetPass = (): void => {
    navigate('/recover-password');
  };

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Typography variant="subtitle1" className={clsx('mb-9', classes.title)}>
          Login
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
          <Typography variant="subtitle2" className="custom-label">
            Password
          </Typography>
          <FormControl variant="outlined" className="mb-7">
            <OutlinedInput
              name="password"
              placeholder="Password"
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
          <Button
            color="primary"
            variant="text"
            type="button"
            onClick={goToForgetPass}
            className={clsx('mb-7 p-0', classes.linkButton)}
          >
            <Typography variant="button">Forgot password?</Typography>
          </Button>
          <Button
            className={classes.submitButton}
            color="primary"
            size="large"
            variant="contained"
            type="submit"
            disabled={submitting}
          >
            {!submitting ? 'Login' : <CircularProgress size={25} />}
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
