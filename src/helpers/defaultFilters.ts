import { FilterObject } from '../models/common';
import { FiltersState } from '../redux/reducers/filters.reducer';

const genericFilterObject: FilterObject = {
  sortBy: '-updated_at',
  view: 'grid',
};

export const defaultFilters: FiltersState = {
  devices: genericFilterObject,
  devicesTypes: genericFilterObject,
  escrowDevices: genericFilterObject,
  discoveredDevices: genericFilterObject,
  ingestors: genericFilterObject,
  integrations: genericFilterObject,
  policies: genericFilterObject,
  pollableAttributes: genericFilterObject,
  translators: genericFilterObject,
};
