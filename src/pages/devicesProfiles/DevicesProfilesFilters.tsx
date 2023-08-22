import React, { useEffect, useState } from 'react';
import {
  Grid,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';
import { Device, DeviceType, DeviceTypes } from '@edgeiq/edgeiq-api-js';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { setAlert } from '../../redux/reducers/alert.reducer';
import { setFilters } from '../../redux/reducers/filters.reducer';
import { errorHighlight, profileTypesMap } from '../../app/constants';
import AccountSelect from '../../components/AccountSelect';
import SearchBox from '../../components/SearchBox';
import useStyles from './styles';

const DevicesProfilesFilters: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const stateFilters = useAppSelector((state: RootState) => state.filters);
  const filters = stateFilters.devicesTypes.filters;

  const [searchOptions, setSearchOptions] = useState<DeviceType[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [totalProfiles, setTotalProfiles] = useState<number>(0);
  const [typesSelected, setTypesSelected] = useState<string[]>([]);

  const profilesTypes = Object.keys(profileTypesMap);
  const allTypesSelected = typesSelected.length === profilesTypes.length;

  useEffect(() => {
    setTypesSelected(
      filters?.type && filters.type !== '' ? filters.type.split('|') : [],
    );
  }, [filters]);

  const changeFilters = (prop: string, value: string): void => {
    // TODO: check if the values are the same before dispatching
    dispatch(
      setFilters(
        {
          ...filters,
          [prop]: value,
        },
        'devicesTypes',
      ),
    );
  };

  const handleAccountChange = (id: string): void => {
    changeFilters('company_id', id);
  };

  const handleTypeChange = (event: SelectChangeEvent<string[]>): void => {
    const {
      target: { value },
    } = event;

    if (value.includes('all')) {
      // changeFilters(
      //   'type',
      //   profilesTypes.reduce((preVal, current, i): string => {
      //     return i === 0 ? current : `${preVal}|${current}`;
      //   }, ''),
      // );
      return;
    }
    changeFilters(
      'type',
      typeof value === 'string'
        ? value.replaceAll(',', '|')
        : value.length > 0
        ? value.join('|')
        : '',
    );
  };

  const selectAllTypes = (): void => {
    if (!allTypesSelected) {
      changeFilters('type', profilesTypes.join('|'));
    } else {
      changeFilters('type', '');
    }
  };

  const handleSuggestionCallback = (value: string): void => {
    setSearchLoading(true);
    DeviceTypes.list(
      { name: { operator: 'like', value } },
      { page: 1, itemsPerPage: 5 },
    )
      .then((response) => {
        setSearchOptions(response.deviceTypes);
        setTotalProfiles(response.pagination.total);
      })
      .catch((error) => {
        dispatch(
          setAlert({
            type: 'error',
            highlight: errorHighlight,
            message: error.message,
          }),
        );
      })
      .finally(() => {
        setSearchLoading(false);
      });
  };

  const handleOnSelectCallback = (_option: Device): void => {
    setTotalProfiles(1);
    // setDevices([option]);
  };

  const handleOnSearchCallback = (value: string): void => {
    changeFilters('name', value);
  };

  const handleOnClearSearch = (): void => {
    setSearchOptions([]);
  };

  return (
    <SearchBox
      hasSearchInput={true}
      type="Devices"
      labelField="name"
      options={searchOptions}
      loading={searchLoading}
      totalCount={totalProfiles}
      optionIcon={<DevicesIcon />}
      onChangeCallback={handleSuggestionCallback}
      onSelectCallback={handleOnSelectCallback}
      onSearchCallback={handleOnSearchCallback}
      onClearCallback={handleOnClearSearch}
      content={
        <Grid container spacing={2}>
          <Grid item>
            <AccountSelect
              id={filters?.company_id ?? ''}
              isFilter={true}
              onAccountChange={handleAccountChange}
            />
          </Grid>
          <Grid item>
            <Select
              multiple
              displayEmpty
              className={classes.input}
              value={typesSelected}
              onChange={handleTypeChange}
              inputProps={{ 'aria-label': 'Without label' }}
              renderValue={(selected): string[] | React.ReactElement => {
                if (selected.length === 0) {
                  return <Typography variant="button">Profile Type</Typography>;
                }

                if (selected.length > 0) {
                  return (
                    <Typography variant="button">
                      {`Types selected (${selected.length})`}
                    </Typography>
                  );
                }

                return <Typography variant="button">{selected}</Typography>;
              }}
            >
              <MenuItem dense value="all">
                <Checkbox
                  checked={allTypesSelected}
                  indeterminate={
                    typesSelected.length !== 0 && !allTypesSelected
                  }
                  onClick={selectAllTypes}
                />
                <ListItemText primary="All" />
              </MenuItem>
              {profilesTypes.map((profileType, key) => (
                <MenuItem dense key={key} value={profileType}>
                  <Checkbox checked={typesSelected.indexOf(profileType) > -1} />
                  <ListItemText primary={profileTypesMap[profileType]} />
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      }
    />
  );
};

export default DevicesProfilesFilters;
