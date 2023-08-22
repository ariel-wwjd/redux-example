import { Rule } from '@edgeiq/edgeiq-api-js';

import { TableColumn, TableItemType } from '../../components/SharedTable';

export const PoliciesColumns: TableColumn[] = [
  {
    id: 'description',
    label: 'Name',
    type: 'link',
    link: (item: TableItemType): string => {
      const policy = item as Rule;
      return `policy/${policy._id}`;
    },
    cellValue: (item: TableItemType): string => {
      const policy = item as Rule;
      return policy.description;
    },
    isBold: (_item): boolean => true,
  },
];
