import { genericSorting, SortingOption } from '../../models/common';

export const sortingOptions: SortingOption[] = [
  ...genericSorting,
  {
    label: '(A-Z)',
    value: 'name',
  },
];
