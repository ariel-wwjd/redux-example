import { defaultFilters } from '../../helpers/defaultFilters';
import { getFilters, setLocalFilters } from '../../helpers/storage';
import { FilterObject } from '../../models/common';

const FiltersTypes = {
  SET_SORTING: 'SET_SORTING',
  SET_VIEW_OPTION: 'SET_VIEW_OPTION',
  SET_FILTERS: 'SET_FILTERS',
};

export const setSorting = (
  sorting: string,
  filterName: FiltersKeyName,
): FiltersAction => ({
  type: FiltersTypes.SET_SORTING,
  data: {
    filterName,
    data: sorting,
  },
});

export const setViewOption = (
  viewOption: string,
  filterName: FiltersKeyName,
): FiltersAction => ({
  type: FiltersTypes.SET_VIEW_OPTION,
  data: {
    filterName,
    data: viewOption,
  },
});

export const setFilters = (
  filters: { [key: string]: string },
  filterName: FiltersKeyName,
): FiltersAction => ({
  type: FiltersTypes.SET_FILTERS,
  data: {
    filterName,
    data: filters,
  },
});

export type FiltersState = {
  devices: FilterObject;
  devicesTypes: FilterObject;
  escrowDevices: FilterObject;
  discoveredDevices: FilterObject;
  ingestors: FilterObject;
  integrations: FilterObject;
  policies: FilterObject;
  pollableAttributes: FilterObject;
  translators: FilterObject;
};

// INITIAL STATE
export const filterInitialState: FiltersState = {
  ...defaultFilters,
  ...getFilters(),
};

export type FiltersKeyName = keyof typeof filterInitialState;

export type FiltersAction = {
  type: string;
  data: {
    filterName: FiltersKeyName;
    data: { [key: string]: string } | string;
  };
};

const filtersReducer = (
  state = filterInitialState,
  action: FiltersAction,
): FiltersState => {
  let newState = null;
  switch (action.type) {
    case FiltersTypes.SET_SORTING:
      newState = {
        ...state,
        [action.data.filterName]: {
          ...state[action.data.filterName],
          sortBy: action.data.data,
        },
      };
      break;

    case FiltersTypes.SET_VIEW_OPTION:
      newState = {
        ...state,
        [action.data.filterName]: {
          ...state[action.data.filterName],
          view: action.data.data,
        },
      };
      break;

    case FiltersTypes.SET_FILTERS:
      newState = {
        ...state,
        [action.data.filterName]: {
          ...state[action.data.filterName],
          filters: action.data.data,
        },
      };
      break;

    default:
      newState = state;
      break;
  }
  setLocalFilters(newState);
  return newState;
};

export default filtersReducer;
