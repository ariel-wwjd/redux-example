import React, { useState, ReactElement, useEffect } from 'react';
// import debounce from 'lodash.debounce';
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
import { Device, Devices, DeviceType } from '@edgeiq/edgeiq-api-js';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setAlert } from '../../../redux/reducers/alert.reducer';
import { setFilters } from '../../../redux/reducers/filters.reducer';
import {
  heartBeatStatusLabel,
  heartbeatStatus,
  transferStatus,
  transferStatusLabel,
  errorHighlight,
} from '../../../app/constants';
import AccountSelect from '../../../components/AccountSelect';
import SearchBox from '../../../components/SearchBox';
import useStyles from './styles';

interface DevicesFilterProps {
  deviceTypes: DeviceType[];
}

const DevicesFilter: React.FC<DevicesFilterProps> = ({ deviceTypes }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const stateFilters = useAppSelector((state: RootState) => state.filters);
  const devicesState = useAppSelector((state: RootState) => state.devices);
  const filters = stateFilters.devices.filters;
  const escrowFilters = stateFilters.escrowDevices.filters;

  const [deviceTypesSelected, setDeviceTypesSelected] = useState<string[]>([]);
  const [heartbeatSelected, setHeartbeatSelected] = useState<string[]>([]);
  const [transferStatusSelected, setTransferStatusSelected] =
    useState<string>('');

  const [searchOptions, setSearchOptions] = useState<Device[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [totalDevices, setTotalDevices] = useState<number>(0);

  const allDevicesTypeSelected =
    deviceTypes.length > 0 && deviceTypesSelected.length === deviceTypes.length;
  const allHeartbeatSelected =
    heartbeatStatus.length > 0 &&
    heartbeatSelected.length === heartbeatStatus.length;

  useEffect(() => {
    if (filters) {
      setDeviceTypesSelected(
        filters.device_type_id && filters.device_type_id !== ''
          ? filters.device_type_id.split('|')
          : [],
      );
      setHeartbeatSelected(
        filters.heartbeat_status && filters.heartbeat_status !== ''
          ? filters.heartbeat_status.split('|')
          : [],
      );
    }
    if (escrowFilters) {
      setTransferStatusSelected(escrowFilters.transfer_status);
    }
  }, [filters, escrowFilters]);

  const changeFilters = (prop: string, value: string): void => {
    // TODO: check if the values are the same before dispatching
    if (devicesState.devicesGenre === 'active') {
      dispatch(
        setFilters(
          {
            ...filters,
            [prop]: value,
          },
          'devices',
        ),
      );
    } else if (devicesState.devicesGenre === 'escrow') {
      dispatch(
        setFilters(
          {
            ...escrowFilters,
            [prop]: value,
          },
          'escrowDevices',
        ),
      );
    }
  };

  // const debouncedFilters = useCallback(debounce(
  //   changeFilters,
  //   1000
  // ), []);

  const handleMultiSelect =
    (prop: string) =>
    (event: SelectChangeEvent<string[]>): void => {
      const {
        target: { value },
      } = event;
      // debouncedFilters.cancel();

      if (value.includes('all')) {
        if (prop === 'device_type_id') {
          changeFilters(
            prop,
            deviceTypes.reduce((preVal, current, i): string => {
              return i === 0 ? current._id : `${preVal}|${current._id}`;
            }, ''),
          );
        } else {
          changeFilters(
            prop,
            heartbeatStatus.reduce((preVal, current, i): string => {
              return i === 0 ? current : `${preVal}|${current}`;
            }, ''),
          );
        }
        return;
      }

      changeFilters(
        prop,
        typeof value === 'string'
          ? value.replaceAll(',', '|')
          : value.length > 0
          ? value.join('|')
          : '',
      );
      // debouncedFilters(
      //   prop,
      //   typeof value === 'string'
      //     ? value.replaceAll(',', '|')
      //     : value.join('|'),
      // );
    };

  const handleAccountChange = (id: string): void => {
    // debouncedFilters('company_id', id);
    changeFilters('company_id', id);
  };

  const handleTransferStatusChange = (
    event: SelectChangeEvent<typeof transferStatusSelected>,
  ): void => {
    changeFilters('transfer_status', event.target.value);
  };

  const handleSuggestionCallback = (value: string): void => {
    setSearchLoading(true);
    Devices.list(
      { name: { operator: 'like', value } },
      { page: 1, itemsPerPage: 5 },
    )
      .then((response) => {
        setSearchOptions(response.devices);
        setTotalDevices(response.pagination.total);
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
    setTotalDevices(1);
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
      totalCount={totalDevices}
      optionIcon={<DevicesIcon />}
      onChangeCallback={handleSuggestionCallback}
      onSelectCallback={handleOnSelectCallback}
      onSearchCallback={handleOnSearchCallback}
      onClearCallback={handleOnClearSearch}
      content={
        <Grid container spacing={2}>
          <Grid item>
            <AccountSelect
              id={
                devicesState.devicesGenre === 'active'
                  ? filters?.company_id ?? ''
                  : escrowFilters?.company_id ?? ''
              }
              isFilter={true}
              onAccountChange={handleAccountChange}
            />
          </Grid>
          {devicesState.devicesGenre === 'active' && (
            <>
              <Grid item>
                <Select
                  className={classes.input}
                  multiple
                  value={deviceTypesSelected}
                  onChange={handleMultiSelect('device_type_id')}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={(selected): string[] | ReactElement => {
                    if (selected.length === 0) {
                      return (
                        <Typography variant="button">Device Profile</Typography>
                      );
                    }

                    if (selected.length > 0) {
                      return (
                        <Typography variant="button">
                          {`Profiles selected (${selected.length})`}
                        </Typography>
                      );
                    }

                    return <Typography variant="button">{selected}</Typography>;
                  }}
                >
                  <MenuItem dense value="all">
                    <Checkbox checked={allDevicesTypeSelected} />
                    <ListItemText primary="All" />
                  </MenuItem>
                  {deviceTypes.map((item, key) => (
                    <MenuItem dense key={key} value={item._id}>
                      <Checkbox
                        checked={deviceTypesSelected.indexOf(item._id) > -1}
                      />
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item>
                <Select
                  className={classes.input}
                  multiple
                  value={heartbeatSelected}
                  onChange={handleMultiSelect('heartbeat_status')}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={(selected): string[] | ReactElement => {
                    if (selected.length === 0) {
                      return (
                        <Typography variant="button">Heartbeat</Typography>
                      );
                    }

                    if (selected.length > 0) {
                      return (
                        <Typography variant="button">
                          {`Heartbeat selected (${selected.length})`}
                        </Typography>
                      );
                    }

                    return <Typography variant="button">{selected}</Typography>;
                  }}
                >
                  <MenuItem dense value="all">
                    <Checkbox checked={allHeartbeatSelected} />
                    <ListItemText primary="All" />
                  </MenuItem>
                  {heartbeatStatus.map((item, key) => (
                    <MenuItem dense key={key} value={item}>
                      <Checkbox
                        checked={heartbeatSelected.indexOf(item) > -1}
                      />
                      <ListItemText primary={heartBeatStatusLabel[item]} />
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </>
          )}

          {devicesState.devicesGenre === 'escrow' && (
            <>
              <Grid item>
                <Select
                  className={classes.input}
                  value={transferStatusSelected}
                  onChange={handleTransferStatusChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={(selected): string | ReactElement => {
                    if (selected.length === 0) {
                      return (
                        <Typography variant="button">
                          Transfer Status
                        </Typography>
                      );
                    }

                    return (
                      <Typography variant="button">
                        {transferStatusLabel[selected]}
                      </Typography>
                    );
                  }}
                >
                  {transferStatus.map((item, key) => (
                    <MenuItem dense key={key} value={item}>
                      {transferStatusLabel[item]}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </>
          )}
        </Grid>
      }
    />
  );
};

export default DevicesFilter;
