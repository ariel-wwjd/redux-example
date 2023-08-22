import { Filters, Filter } from '@edgeiq/edgeiq-api-js';

const likeKeys = ['name', 'description'];
const specialKeys = ['transfer_status'];

const parseFilters = (filters: { [key: string]: string }): Filters => {
  if (Object.keys(filters).length === 0) {
    return {};
  }

  const result: Filter[] = [];
  for (const key in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, key)) {
      const value = filters[key];
      if (value !== '') {
        if (specialKeys.includes(key)) {
          const filter: Filter = {
            operator: value.indexOf('_ne') !== -1 ? 'ne' : 'eq',
            value: 'null',
            key:
              value.indexOf('_ne') !== -1
                ? value.substring(0, value.indexOf('_ne'))
                : value,
          };
          result.push(filter);
        } else {
          const isMulti = value.indexOf('|') !== -1;
          const filterValue = isMulti ? value.split('|') : value;
          const filter: Filter = {
            operator: isMulti ? 'in' : likeKeys.includes(key) ? 'like' : 'eq',
            value: filterValue,
            key,
          };
          result.push(filter);
        }
      }
    }
  }

  return {
    filters: result,
  };
};

export default parseFilters;
