import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import {
  Authentication,
  Companies,
  CompaniesFilters,
  EdgeIQAPI,
  User,
  UserType,
  UserTypes,
} from '@edgeiq/edgeiq-api-js';

import { useAppDispatch } from '../redux/hooks';
import {
  setUserData,
  setUserCompany,
  setUserType,
  setUserCompanies,
} from '../redux/reducers/user.reducer';
import { getToken, removeToken, setInitialFilters } from '../helpers/storage';

import AccessLayout from '../layouts/access';
import MainLayout from '../layouts/main';
import DashboardPage from '../pages/dashboard';
import Login from '../pages/login';
import RecoverPassword from '../pages/recoverPassword';
import ResetPassword from '../pages/resetPassword';
import DevicesPage from '../pages/devices';
import CreateDevicePage from '../pages/createDevice';
import DeviceContent from '../pages/deviceContent';
import DevicesProfilesPage from '../pages/devicesProfiles';
import DataManagementPage from '../pages/dataManagement';
import PoliciesPage from '../pages/policies/Policies';
import UsersPage from '../pages/users'

import { AppTheme } from './Theme';
import './App.css';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    EdgeIQAPI.init({
      url: process.env.REACT_APP_API_URL,
    });
    setInitialFilters();
    const token = getToken();
    if (token) {
      EdgeIQAPI.setSessionToken(token);
      Authentication.me()
        .then((user: User) => {
          if (user) {
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
          }
        })
        .catch(() => {
          removeToken();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={AppTheme}>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={<AccessLayout component={Login} backToLogin={false} />}
            />
            <Route
              path="/recover-password"
              element={
                <AccessLayout component={RecoverPassword} backToLogin={true} />
              }
            />
            <Route
              path="/reset-password"
              element={
                <AccessLayout component={ResetPassword} backToLogin={true} />
              }
            />
            <Route
              path="/dashboard"
              element={
                <MainLayout component={DashboardPage} loading={loading} />
              }
            />
            <Route
              path="/devices"
              element={<MainLayout component={DevicesPage} loading={loading} />}
            />
            <Route
              path="/new-device"
              element={
                <MainLayout component={CreateDevicePage} loading={loading} />
              }
            />
            <Route
              path="/device/:id"
              element={
                <MainLayout component={DeviceContent} loading={loading} />
              }
            />
            <Route
              path="/devices-profiles"
              element={
                <MainLayout component={DevicesProfilesPage} loading={loading} />
              }
            />
            <Route
              path="/data-management"
              element={
                <MainLayout component={DataManagementPage} loading={loading} />
              }
            />
            <Route
              path="/policies"
              element={
                <MainLayout component={PoliciesPage} loading={loading} />
              }
            />
            <Route
              path="/users"
              element={
                <MainLayout component={UsersPage} loading={loading} />
              }
            />
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
