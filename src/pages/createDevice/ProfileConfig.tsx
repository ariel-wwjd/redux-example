import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Link,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DeviceType, DeviceTypes } from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setStateDevicesTypes } from '../../redux/reducers/devices.reducer';
import { setAlert } from '../../redux/reducers/alert.reducer';
import { RootState } from '../../redux/store';
import { optionsPaginationsFilter, errorHighlight } from '../../app/constants';
import useStyles from './styles';

interface ProfileConfigProps {
  deviceTypeId: string;
  onChangeDeviceType: (prop: string, deviceTypeId: string) => void;
}

const ProfileConfig: React.FC<ProfileConfigProps> = ({
  deviceTypeId,
  onChangeDeviceType,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const devicesState = useAppSelector((state: RootState) => state.devices);

  const [devicesTypes, setDevicesTypes] = useState<DeviceType[]>(
    devicesState.devicesTypes,
  );

  useEffect(() => {
    if (devicesTypes.length === 0) {
      DeviceTypes.list({}, optionsPaginationsFilter)
        .then((result) => {
          setDevicesTypes(result.deviceTypes);
          dispatch(setStateDevicesTypes(result.deviceTypes));
        })
        .catch((error) => {
          dispatch(
            setAlert({
              type: 'error',
              highlight: errorHighlight,
              message: error.message,
            }),
          );
        });
    }
  }, []);

  const handleChangeProfile = (event: SelectChangeEvent): void => {
    onChangeDeviceType('device_type_id', event.target.value as string);
  };

  const goToNewDeviceType = (): void => {
    navigate('/new-device-profile');
  };

  return (
    <>
      <Typography
        variant="button"
        component="div"
        className={clsx('mb-1', classes.configTitle)}
      >
        Select a profile
      </Typography>
      <Typography
        variant="overline"
        component="div"
        className={clsx('mb-4', classes.configSubtitle)}
      >
        Profiles are predefined by company accounts.
      </Typography>
      <FormControl className={clsx('mb-6', classes.input)}>
        <Select
          displayEmpty
          value={deviceTypeId}
          onChange={handleChangeProfile}
        >
          <MenuItem dense value="">
            Device profile
          </MenuItem>
          {devicesTypes.map((deviceType, index) => (
            <MenuItem dense key={index} value={deviceType._id}>
              {deviceType.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography
        variant="overline"
        component="div"
        className={classes.configSubtitle}
      >
        <InfoOutlinedIcon
          fontSize="small"
          className={clsx('mr-2', classes.infoIcon)}
        />
        If you don’t find a profile, you can
        <Link
          className={clsx('ml-1', classes.link)}
          onClick={goToNewDeviceType}
          underline="none"
        >
          create a new one.
        </Link>
      </Typography>
    </>
  );
};

export default ProfileConfig;
