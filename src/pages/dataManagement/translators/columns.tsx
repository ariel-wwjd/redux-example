import { Translator } from '@edgeiq/edgeiq-api-js';

import { TableColumn, TableItemType } from '../../../components/SharedTable';
import { translatorTypesMap } from '../../../app/constants';

export const TranslatorsColumns: TableColumn[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'link',
    link: (item: TableItemType): string => {
      const translator = item as Translator;
      return `translator/${translator._id}`;
    },
    cellValue: (item: TableItemType): string => {
      const translator = item as Translator;
      return translator.name;
    },
    isBold: (_item): boolean => true,
  },
  {
    id: 'type',
    label: 'Type',
    type: 'text',
    cellValue: (item: TableItemType): string => {
      const translator = item as Translator;
      return translatorTypesMap[translator.type];
    },
  },
];
