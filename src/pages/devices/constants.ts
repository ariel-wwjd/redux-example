import { genericSorting, SortingOption } from '../../models/common';

export const sortingOptions: SortingOption[] = [
  ...genericSorting,
  {
    label: 'ID (A-Z)',
    value: 'unique_id',
  },
  {
    label: '(A-Z)',
    value: 'name',
  },
];

export const viewsOptions = ['map', 'list', 'grid'];
