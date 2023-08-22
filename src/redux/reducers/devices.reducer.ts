import { Device, DeviceType, EscrowDevice } from '@edgeiq/edgeiq-api-js';
import { createSelector } from 'reselect';

export const getDeviceSelector = createSelector(
  (state: DevicesState) => state,
  (_: null, id: string | undefined): string | undefined => id,
  (state, id) => {
    if (!state.devices.length) {
      return state.device;
    }
    return state.devices.find((device: Device) => device._id === id);
  },
);

export const DevicesTypes = {
  SET_DEVICES_GENRE: 'SET_DEVICES_GENRE',
  SET_DEVICES: 'SET_DEVICES',
  SET_ACTUAL_DEVICE: 'SET_ACTUAL_DEVICE',
  SET_DEVICES_TYPES: 'SET_DEVICES_TYPES',
  SET_ACTUAL_DEVICE_TYPE: 'SET_ACTUAL_DEVICE_TYPE',
  SET_NEW_DEVICE: 'SET_NEW_DEVICE',
  SET_ESCROW_DEVICES: 'SET_ESCROW_DEVICES',
  SET_ACTUAL_ESCROW_DEVICE: 'SET_ACTUAL_ESCROW_DEVICE',
};

export const setDevicesGenre = (genre: string): DevicesAction => ({
  type: DevicesTypes.SET_DEVICES_GENRE,
  data: genre,
});

export const setStateDevices = (devices: Device[]): DevicesAction => ({
  type: DevicesTypes.SET_DEVICES,
  data: devices,
});

export const setActualDevice = (device: Device): DevicesAction => ({
  type: DevicesTypes.SET_ACTUAL_DEVICE,
  data: device,
});

export const setStateDevicesTypes = (devices: DeviceType[]): DevicesAction => ({
  type: DevicesTypes.SET_DEVICES_TYPES,
  data: devices,
});

export const setActualDeviceType = (device: DeviceType): DevicesAction => ({
  type: DevicesTypes.SET_ACTUAL_DEVICE_TYPE,
  data: device,
});

export const setStateEscrowDevices = (
  escrowDevices: EscrowDevice[],
): DevicesAction => ({
  type: DevicesTypes.SET_ESCROW_DEVICES,
  data: escrowDevices,
});

export const setActualEscrowDevice = (
  escrowDevice: EscrowDevice,
): DevicesAction => ({
  type: DevicesTypes.SET_ACTUAL_ESCROW_DEVICE,
  data: escrowDevice,
});

export const setNewDevice = (device: Device): DevicesAction => ({
  type: DevicesTypes.SET_NEW_DEVICE,
  data: device,
});

export type DevicesState = {
  devicesGenre: string;
  devices: Device[];
  device: Device | null;
  newDevice: Device | null;
  devicesTypes: DeviceType[];
  deviceType: DeviceType | null;
  escrowDevices: EscrowDevice[];
  escrowDevice: EscrowDevice | null;
};

// INITIAL STATE
const devicesInitialState: DevicesState = {
  devicesGenre: 'active',
  devices: [],
  device: null,
  newDevice: null,
  devicesTypes: [],
  deviceType: null,
  escrowDevices: [],
  escrowDevice: null,
};

export type DevicesAction = {
  type: string;
  data:
    | string
    | Device[]
    | Device
    | DeviceType[]
    | DeviceType
    | EscrowDevice
    | EscrowDevice[];
};

const devicesReducer = (
  state = devicesInitialState,
  action: DevicesAction,
): DevicesState => {
  switch (action.type) {
    case DevicesTypes.SET_DEVICES:
      return {
        ...state,
        devices: action.data as Device[],
      };
    case DevicesTypes.SET_NEW_DEVICE:
      return {
        ...state,
        newDevice: action.data as Device,
      };
    case DevicesTypes.SET_DEVICES_GENRE:
      return {
        ...state,
        devicesGenre: action.data as string,
      };

    case DevicesTypes.SET_DEVICES:
      return {
        ...state,
        devices: action.data as Device[],
      };

    case DevicesTypes.SET_ACTUAL_DEVICE:
      return {
        ...state,
        device: action.data as Device,
        newDevice: action.data as Device,
        deviceType: state.deviceType
          ? state.deviceType
          : (state.devicesTypes?.find((deviceType) => {
              const device = action.data as Device;
              return deviceType._id === device.device_type_id;
            }) as DeviceType),
      };

    case DevicesTypes.SET_DEVICES_TYPES:
      return {
        ...state,
        devicesTypes: action.data as DeviceType[],
      };

    case DevicesTypes.SET_ACTUAL_DEVICE_TYPE:
      return {
        ...state,
        deviceType: action.data as DeviceType,
      };

    case DevicesTypes.SET_ESCROW_DEVICES:
      return {
        ...state,
        escrowDevices: action.data as EscrowDevice[],
      };

    case DevicesTypes.SET_ACTUAL_ESCROW_DEVICE:
      return {
        ...state,
        escrowDevice: action.data as EscrowDevice,
      };

    case DevicesTypes.SET_NEW_DEVICE:
      return {
        ...state,
        newDevice: action.data as Device,
      };

    default:
      return state;
  }
};

export default devicesReducer;
