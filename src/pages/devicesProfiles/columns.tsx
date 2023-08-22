import { DeviceType } from '@edgeiq/edgeiq-api-js';
import { Tooltip, Typography } from '@mui/material';

import { TableColumn, TableItemType } from '../../components/SharedTable';

export const DevicesProfilesColumns: TableColumn[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'link',
    link: (item: TableItemType): string => {
      const device = item as DeviceType;
      return `device-profile/${device._id}`;
    },
    cellValue: (item: TableItemType): string => {
      const device = item as DeviceType;
      return device.name;
    },
    isBold: (_item): boolean => true,
  },
  {
    id: 'long_description',
    label: 'Description',
    type: 'custom',
    parser: (item: TableItemType): string | React.ReactElement => {
      const deviceType = item as DeviceType;
      if (!deviceType.long_description) {
        return '--';
      }
      return (
        <Tooltip placement="top" title={deviceType.long_description}>
          <Typography
            variant="button"
            component="span"
            style={{ cursor: 'pointer' }}
          >
            {deviceType.long_description}
          </Typography>
        </Tooltip>
      );
    },
  },
  {
    id: 'type',
    label: 'Device profile',
    type: 'text',
  },
];
