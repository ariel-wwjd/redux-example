import { Base } from '@edgeiq/edgeiq-api-js/dist/models';

export type StatusTheme = 'success' | 'warning' | 'info' | 'error';

export type PermissionAction = 'create' | 'update' | 'read' | 'delete';

export type SortingOption = {
  label: string;
  value: string;
};

export type NestedObject = {
  [key: string]: NestedObject | string;
};

export type FilterObject = {
  sortBy: string;
  view: string;
  filters?: {
    [key: string]: string;
  };
};

export const lastUpdatedSorting: SortingOption = {
  label: 'Last Updated',
  value: '-updated_at',
};

export const createdOldestSorting: SortingOption = {
  label: 'Created (Oldest first)',
  value: 'created_at',
};

export const createdNewestSorting: SortingOption = {
  label: 'Created (Newest first)',
  value: '-created_at',
};

export const genericSorting: SortingOption[] = [
  lastUpdatedSorting,
  createdOldestSorting,
  createdNewestSorting,
];

export const baseModel: Base = {
  _id: '',
  company_id: '',
  created_at: '',
  updated_at: '',
  origin: '',
  user_id: '',
};
