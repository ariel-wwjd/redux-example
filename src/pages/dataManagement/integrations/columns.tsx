import { Integration } from '@edgeiq/edgeiq-api-js';

import { TableColumn, TableItemType } from '../../../components/SharedTable';
import { integrationTypesMap } from '../../../app/constants';

export const IntegrationsColumns: TableColumn[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'link',
    link: (item: TableItemType): string => {
      const integration = item as Integration;
      return `integration/${integration._id}`;
    },
    cellValue: (item: TableItemType): string => {
      const integration = item as Integration;
      return integration.name;
    },
    isBold: (_item): boolean => true,
  },
  {
    id: 'type',
    label: 'Type',
    type: 'text',
    cellValue: (item: TableItemType): string => {
      const integration = item as Integration;
      return integrationTypesMap[integration.type];
    },
  },
];
