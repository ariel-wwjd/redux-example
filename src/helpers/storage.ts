import { FiltersState } from '../redux/reducers/filters.reducer';
import { defaultFilters } from './defaultFilters';

const TOKEN_NAME = 'EIQ_TOKEN';
const FILTERS_NAME = 'EIQ_FILTERS';

export const setToken = (token?: string): void => {
  if (token) {
    window.localStorage.setItem(TOKEN_NAME, token);
  }
};

export const getToken = (): string | null => {
  return window.localStorage.getItem(TOKEN_NAME);
};

export const removeToken = (): void => {
  window.localStorage.removeItem(TOKEN_NAME);
};

export const setInitialFilters = (reset = false): void => {
  let filters = reset ? defaultFilters : getFilters();
  if (Object.keys(filters).length === 0) {
    filters = defaultFilters;
  }
  const filtersString = JSON.stringify(filters);
  setLocalFilters(JSON.parse(filtersString));
};

export const setLocalFilters = (filters: FiltersState): void => {
  window.localStorage.setItem(FILTERS_NAME, JSON.stringify(filters));
};

export const getFilters = (): FiltersState => {
  const filters = window.localStorage.getItem(FILTERS_NAME);
  return filters ? JSON.parse(filters) : defaultFilters;
};
