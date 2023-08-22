import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { setDevicesGenre } from '../../redux/reducers/devices.reducer';
import { setAlert } from '../../redux/reducers/alert.reducer';
import { errorHighlight } from '../../app/constants';
import useStyles from './styles';

interface DevicesGenreProps {
  checkCreation?: boolean;
}

const DevicesGenre: React.FC<DevicesGenreProps> = ({
  checkCreation = false,
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const devicesState = useAppSelector((state: RootState) => state.devices);
  const stateUser = useAppSelector((state: RootState) => state.user);

  const [canRead, setCanRead] = useState({
    device: true,
    escrow: true,
    discoverd: true,
  });

  const [canCreate, setCanCreate] = useState({
    device: true,
    escrow: true,
    discoverd: true,
  });

  useEffect(() => {
    // if the component is rendered from the creation page
    // Check for creation permissions
    if (checkCreation) {
      // Make sure the user has permission to create a new device
      let createDevice = true;
      let createEscrow = true;
      let createDiscovered = true;
      if (
        stateUser &&
        stateUser.permissions?.device &&
        !stateUser.permissions.device.create
      ) {
        createDevice = false;
      }
      if (
        stateUser &&
        stateUser.permissions?.escrow_device &&
        !stateUser.permissions.escrow_device.create
      ) {
        createEscrow = false;
      }
      if (
        stateUser &&
        stateUser.permissions?.discoverd_device &&
        !stateUser.permissions.discoverd_device.create
      ) {
        createDiscovered = false;
      }
      // By default the genre is active, if the user can't create it
      // we set the genre to the next type they can.
      if (devicesState.devicesGenre === 'active' && !createDevice) {
        if (createEscrow) {
          onChangeDeviceGenre('escrow');
        }
        if (createDiscovered) {
          onChangeDeviceGenre('discovered');
        }
      }
      setCanCreate({
        device: createDevice,
        escrow: createEscrow,
        discoverd: createDiscovered,
      });
      if (!createDevice && !createEscrow) {
        dispatch(
          setAlert({
            type: 'error',
            highlight: errorHighlight,
            message: `You don't have permission to create a new active or escrow device`,
          }),
        );
        navigate('/dashboard');
      }
    } else {
      // Make sure the user has permission to read a new device
      let readDevice = true;
      let readEscrow = true;
      let readDiscovered = true;
      if (
        stateUser &&
        stateUser.permissions?.device &&
        !stateUser.permissions.device.read
      ) {
        readDevice = false;
      }
      if (
        stateUser &&
        stateUser.permissions?.escrow_device &&
        !stateUser.permissions.escrow_device.read
      ) {
        readEscrow = false;
      }
      if (
        stateUser &&
        stateUser.permissions?.discoverd_device &&
        !stateUser.permissions.discoverd_device.read
      ) {
        readDiscovered = false;
      }

      // By default the genre is active, if the user can't read it
      // we set the genre to the next type they can.
      if (devicesState.devicesGenre === 'active' && !readDevice) {
        if (readEscrow) {
          onChangeDeviceGenre('escrow');
        }
        if (readDiscovered) {
          onChangeDeviceGenre('discovered');
        }
      }
      setCanRead({
        device: readDevice,
        escrow: readEscrow,
        discoverd: readDiscovered,
      });
    }
  }, [stateUser]);

  const onChangeDeviceGenre = (type: string) => (): void => {
    dispatch(setDevicesGenre(type));
  };

  return (
    <>
      <Button
        variant="text"
        type="button"
        onClick={onChangeDeviceGenre('active')}
        disabled={!canRead.device || (checkCreation && !canCreate.device)}
        className={clsx('ml-4', classes.typeButton, {
          [classes.chosenTypeButton]: devicesState.devicesGenre === 'active',
        })}
      >
        <Typography variant="button">Active</Typography>
      </Button>
      <Button
        variant="text"
        type="button"
        onClick={onChangeDeviceGenre('escrow')}
        disabled={!canRead.escrow || (checkCreation && !canCreate.escrow)}
        className={clsx('ml-4', classes.typeButton, {
          [classes.chosenTypeButton]: devicesState.devicesGenre === 'escrow',
        })}
      >
        <Typography variant="button">Escrow</Typography>
      </Button>
      <Button
        variant="text"
        type="button"
        onClick={onChangeDeviceGenre('discovered')}
        disabled={!canRead.discoverd || (checkCreation && !canCreate.discoverd)}
        className={clsx('ml-4', classes.typeButton, {
          [classes.chosenTypeButton]:
            devicesState.devicesGenre === 'discovered',
        })}
      >
        <Typography variant="button">Discovered</Typography>
      </Button>
    </>
  );
};

export default DevicesGenre;
