import React, { ReactElement } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import clsx from 'clsx';

import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import useStyles from './styles';

interface AccountSelectProps {
  id: string;
  isFilter?: boolean;
  onAccountChange: (companyId: string) => void;
}

const AccountSelect: React.FC<AccountSelectProps> = ({
  id,
  isFilter = false,
  onAccountChange,
}) => {
  const classes = useStyles();
  const { userCompanies } = useAppSelector((state: RootState) => state.user);

  const handleChangeAccount = (event: SelectChangeEvent): void => {
    onAccountChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <Select
        displayEmpty
        value={id}
        onChange={handleChangeAccount}
        className={clsx({
          [classes.filter]: isFilter,
          [classes.notFilter]: !isFilter,
        })}
        renderValue={(selected): string | ReactElement => {
          const company = userCompanies.find(
            (company) => company._id === selected,
          );
          return company ? (
            <div className={classes.container}>
              {company.branding?.logo_url ? (
                <div
                  className={clsx('mr-2', classes.logo, {
                    [classes.filterLogo]: isFilter,
                  })}
                >
                  <img
                    src={company.branding?.logo_url}
                    className={classes.logoImage}
                  />
                </div>
              ) : (
                <div
                  className={clsx('mr-2', classes.logo, classes.nameLogo, {
                    [classes.filterLogo]: isFilter,
                  })}
                >
                  <Typography
                    variant={isFilter ? 'button' : 'h5'}
                    noWrap
                    color="white"
                  >
                    {company.name.charAt(0)}
                    {company.name.charAt(1)}
                  </Typography>
                </div>
              )}
              <Typography variant="button">{company.name}</Typography>
            </div>
          ) : (
            <Typography variant="button">Account</Typography>
          );
        }}
      >
        <MenuItem dense value="">
          Account
        </MenuItem>
        {userCompanies.map((company, index) => (
          <MenuItem dense key={index} value={company._id}>
            {company.branding?.logo_url ? (
              <div className={clsx('mr-2', classes.logo)}>
                <img
                  src={company.branding?.logo_url}
                  className={classes.logoImage}
                />
              </div>
            ) : (
              <div className={clsx('mr-2', classes.logo, classes.nameLogo)}>
                <Typography variant="h5" noWrap color="white">
                  {company.name.charAt(0)}
                  {company.name.charAt(1)}
                </Typography>
              </div>
            )}
            {company.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AccountSelect;
