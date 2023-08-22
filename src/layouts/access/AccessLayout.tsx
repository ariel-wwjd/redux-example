import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Hidden,
  Paper,
  Button,
  IconButton,
  Typography,
  Grid,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import clsx from 'clsx';

import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import logo from '../../assets/logo.png';
import LayoutCarousel from './LayoutCarousel';
import useStyles from './styles';

interface AccessProps {
  component: React.FC;
  backToLogin?: boolean;
}

const AccessLayout: React.FC<AccessProps> = ({
  component: Component,
  backToLogin = true,
}) => {
  const { isLoggedIn } = useAppSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();

  const goToLogin = (): void => {
    navigate('/login');
  };

  const renderContent = (isMobile = false): JSX.Element => (
    <Grid container className={classes.content}>
      {!isMobile && backToLogin && (
        <Grid item>
          <Button
            className={classes.backButton}
            color="inherit"
            variant="text"
            type="button"
            startIcon={<KeyboardBackspaceIcon />}
            onClick={goToLogin}
          >
            <Typography variant="button">Back to login</Typography>
          </Button>
        </Grid>
      )}
      <Grid item>
        <Component />
      </Grid>
    </Grid>
  );

  return isLoggedIn ? (
    <Navigate
      to={location?.state?.from?.pathname ?? '/dashboard'}
      state={{ from: location }}
    />
  ) : (
    <Grid className={classes.body} container direction="row">
      <Hidden only={['md', 'lg', 'xl']}>
        <Grid item xs={12}>
          {backToLogin && (
            <IconButton
              className={classes.backIcon}
              aria-label="back to login"
              onClick={goToLogin}
              size="medium"
            >
              <ArrowBack />
            </IconButton>
          )}
          <div
            className={clsx(
              'py-7 px-9',
              classes.background,
              classes.backgroundMobile,
            )}
          />
          <Paper className={classes.contentContainerMobile}>
            {renderContent(true)}
          </Paper>
        </Grid>
      </Hidden>
      <Hidden only={['xs', 'sm']}>
        <Grid item md={5} className={classes.background}>
          <div>
            <img src={logo} alt="eiq-logo" className="ml-9 mt-7" />
          </div>
          <LayoutCarousel />
        </Grid>
        <Grid
          item
          md={7}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {renderContent()}
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default AccessLayout;
