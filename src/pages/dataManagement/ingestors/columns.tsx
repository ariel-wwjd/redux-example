import { Ingestor } from '@edgeiq/edgeiq-api-js';

import { TableColumn, TableItemType } from '../../../components/SharedTable';
import {
  ingestorHandlerTypesMap,
  ingestorListenerTypesMap,
} from '../../../app/constants';

export const IngestorsColumns: TableColumn[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'link',
    link: (item: TableItemType): string => {
      const ingestor = item as Ingestor;
      return `ingestor/${ingestor._id}`;
    },
    cellValue: (item: TableItemType): string => {
      const ingestor = item as Ingestor;
      return ingestor.name;
    },
    isBold: (_item): boolean => true,
  },
  {
    id: 'listener_type',
    label: 'Listener Type',
    type: 'text',
    cellValue: (item: TableItemType): string => {
      const ingestor = item as Ingestor;
      return ingestorListenerTypesMap[ingestor.listener_type];
    },
  },
  {
    id: 'handler_type',
    label: 'Handler Type',
    type: 'text',
    cellValue: (item: TableItemType): string => {
      const ingestor = item as Ingestor;
      return ingestorHandlerTypesMap[ingestor.handler_type];
    },
  },
];
