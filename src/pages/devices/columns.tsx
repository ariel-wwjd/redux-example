import { Device, DeviceType, EscrowDevice } from '@edgeiq/edgeiq-api-js';
import { ClassNameMap, Tooltip, Typography } from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';
import FiberSmartRecordIcon from '@mui/icons-material/FiberSmartRecord';

import { TableColumn } from '../../components/SharedTable';
import ColoredBox from '../../components/ColoredBox';
import { heartbeatColorThemeMap } from '../../app/constants';

const getDeviceTypeName = (
  deviceTypeId: string,
  devicesTypes: DeviceType[],
): string => {
  const index = devicesTypes.findIndex(
    (deviceType) => deviceType._id === deviceTypeId,
  );
  if (index === -1) {
    return '';
  }
  return devicesTypes[index].name;
};

const copyTextToClipboard = (text: string) => (): void => {
  navigator.clipboard.writeText(text);
};

export const DevicesColumns = (
  devicesTypes: DeviceType[],
  classes: ClassNameMap,
  devicesGenre: string,
): TableColumn[] => {
  if (devicesGenre === 'active') {
    return [
      {
        id: 'name',
        label: 'Name',
        type: 'link',
        link: (item): string => {
          const device = item as Device;
          return `/device/${device._id}`;
        },
        cellValue: (item): string => {
          const device = item as Device;
          return device.name;
        },
        isBold: (_item): boolean => true,
      },
      {
        id: 'unique_id',
        label: 'Unique ID',
        type: 'custom',
        parser: (item): string | React.ReactElement => {
          const device = item as Device;
          if (!device.unique_id) {
            return '--';
          }
          return (
            <Tooltip
              placement="top"
              title={
                <>
                  <p style={{ margin: '0' }}>{device.unique_id}</p>
                  <p style={{ margin: '0', textAlign: 'center' }}>
                    Click to copy
                  </p>
                </>
              }
            >
              <Typography
                variant="button"
                component="span"
                onClick={copyTextToClipboard(device.unique_id)}
                style={{ cursor: 'pointer' }}
              >
                {/* {`...${device.unique_id.replace(/.(?=.{4})/g, '')}`} */}
                {device.unique_id}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        id: 'device_type_id',
        label: 'Device profile',
        type: 'custom',
        parser: (item): string | React.ReactElement => {
          const device = item as Device;
          if (!device.device_type_id) {
            return '--';
          }
          return (
            <Typography
              variant="button"
              component="div"
              className={classes.tag}
            >
              <DevicesIcon fontSize="small" className="mr-2" />
              {getDeviceTypeName(device.device_type_id, devicesTypes)}
            </Typography>
          );
        },
      },
      {
        id: 'active',
        label: 'Active',
        type: 'custom',
        parser: (item): React.ReactElement => {
          const device = item as Device;
          return (
            <Typography
              variant="button"
              component="div"
              className={classes.tag}
            >
              <FiberSmartRecordIcon fontSize="small" className="mr-2" />
              {device.active ? 'Active' : 'Inactive'}
            </Typography>
          );
        },
      },
      {
        id: 'heartbeat_status',
        label: 'Heartbeat',
        type: 'custom',
        parser: (item): React.ReactElement => {
          const device = item as Device;
          return (
            <div>
              <ColoredBox
                type="heartbeat_status"
                value={device.heartbeat_status ?? ''}
                colorTheme={
                  heartbeatColorThemeMap[device.heartbeat_status ?? 'online']
                }
              />
            </div>
          );
        },
      },
    ];
  } else if (devicesGenre === 'escrow') {
    return [
      {
        id: 'unique_id',
        label: 'Unique ID',
        type: 'custom',
        parser: (item): string | React.ReactElement => {
          const device = item as EscrowDevice;
          if (!device.unique_id) {
            return '--';
          }
          return (
            <Tooltip
              placement="top"
              title={
                <>
                  <p style={{ margin: '0' }}>{device.unique_id}</p>
                  <p style={{ margin: '0', textAlign: 'center' }}>
                    Click to copy
                  </p>
                </>
              }
            >
              <Typography
                variant="button"
                component="span"
                onClick={copyTextToClipboard(device.unique_id)}
                style={{ cursor: 'pointer' }}
              >
                {/* {`...${device.unique_id.replace(/.(?=.{4})/g, '')}`} */}
                {device.unique_id}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        id: 'token',
        label: 'Token',
        type: 'text',
        cellValue: (item): string => {
          const device = item as EscrowDevice;
          return device.token;
        },
      },
      {
        id: 'transfer_status',
        label: 'Transfer Status',
        type: 'text',
        cellValue: (item): string => {
          const device = item as EscrowDevice;
          return device.transfer_initiated_at
            ? 'Device transfer initiated'
            : device.transfer_completed_at
            ? 'Device transfer completed'
            : 'Device transfer not yet initiated';
        },
      },
    ];
  }

  return [];
};
