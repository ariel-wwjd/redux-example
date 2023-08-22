import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  Grid,
  CircularProgress,
} from '@mui/material';

import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { CustomTheme } from '../../app/Theme';
import ResponsiveDrawer from './Drawer';
import useStyles from './styles';

interface MainLayoutProps {
  component: React.FC;
  loading?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  component: Component,
  loading,
}) => {
  const { isLoggedIn } = useAppSelector((state: RootState) => state.user);
  const classes = useStyles();
  const location = useLocation();

  return loading ? (
    <Grid container className={classes.rootContainer}>
      <CircularProgress size={75} thickness={5} />
    </Grid>
  ) : isLoggedIn ? (
    <ThemeProvider theme={CustomTheme('')}>
      <CssBaseline />
      <ResponsiveDrawer component={Component} path={location.pathname} />
    </ThemeProvider>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default MainLayout;
