import { PollableAttribute } from '@edgeiq/edgeiq-api-js';

import { TableColumn, TableItemType } from '../../../components/SharedTable';
import { pollableAttributeTypesMap } from '../../../app/constants';

export const PollableAttributesColumns: TableColumn[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'link',
    link: (item: TableItemType): string => {
      const pollableAttribute = item as PollableAttribute;
      return `pollable-attribute/${pollableAttribute._id}`;
    },
    cellValue: (item: TableItemType): string => {
      const pollableAttribute = item as PollableAttribute;
      return pollableAttribute.name;
    },
    isBold: (_item): boolean => true,
  },
  {
    id: 'type',
    label: 'Type',
    type: 'text',
    cellValue: (item: TableItemType): string => {
      const pollableAttribute = item as PollableAttribute;
      return pollableAttributeTypesMap[pollableAttribute.type];
    },
  },
  {
    id: 'interval',
    label: 'Interval',
    type: 'text',
    cellValue: (item: TableItemType): string => {
      const pollableAttribute = item as PollableAttribute;
      return pollableAttribute.interval?.toString() ?? '';
    },
  },
];
