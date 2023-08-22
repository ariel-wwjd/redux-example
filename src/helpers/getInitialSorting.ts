import { SortingOption } from '../models/common';

const getInitialSorting = (
  sortingValue: string,
  sortingOptions: SortingOption[],
): SortingOption => {
  let result: SortingOption = {
    label: '',
    value: '',
  };

  sortingOptions.forEach((item) => {
    if (item.value === sortingValue) {
      result = item;
    }
  });

  return result;
};

export default getInitialSorting;
