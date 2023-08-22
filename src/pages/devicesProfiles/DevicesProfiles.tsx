import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import {
  DeviceType,
  DeviceTypes,
  PaginationFilter,
} from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { setStateDevicesTypes } from '../../redux/reducers/devices.reducer';
import {
  setSorting,
  setViewOption,
} from '../../redux/reducers/filters.reducer';
import { setAlert } from '../../redux/reducers/alert.reducer';
import Header from '../../components/Header';
import ListSelection from '../../components/ListSelection';
import Card from '../../components/Card';
import CardsGrid from '../../components/CardsGrid';
import SharedTable from '../../components/SharedTable';
import {
  defaultItemsPerPage,
  errorHighlight,
  genericViewOptions,
} from '../../app/constants';
import { SortingOption } from '../../models/common';
import getInitialSorting from '../../helpers/getInitialSorting';
import parseFilters from '../../helpers/parseFilters';
import DevicesProfilesFilters from './DevicesProfilesFilters';
import DeviceProfileCard from './DeviceProfileCard';
import { sortingOptions } from './constants';
import { DevicesProfilesColumns } from './columns';
import useStyles from './styles';

const DevicesProfilesPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.filters);
  const devicesState = useAppSelector((state: RootState) => state.devices);
  const stateUser = useAppSelector((state: RootState) => state.user);

  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [devicesTypes, setDevicesTypes] = useState<DeviceType[]>(
    devicesState.devicesTypes,
  );
  const [selectedSorting, setSelectedSorting] = useState<SortingOption>(
    getInitialSorting(filters.devicesTypes.sortBy, sortingOptions),
  );
  const [selectedView, setSelectedView] = useState(filters.devicesTypes.view);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);

  const dispatchError = (errorMessage: string): void => {
    dispatch(
      setAlert({
        type: 'error',
        highlight: errorHighlight,
        message: errorMessage,
      }),
    );
  };

  const setTotalAndPage = (total: number, addPage = false): void => {
    setTotal(total);
    if (addPage) {
      setPage(page + 1);
    }
  };

  const noLoading = (): void => {
    setLoading(false);
    setLoadingMore(false);
  };

  const getProfiles = (pageNumber: number, addPage = false): void => {
    const pagination: PaginationFilter = {
      itemsPerPage: defaultItemsPerPage,
      page: pageNumber,
      order_by: selectedSorting.value,
    };

    DeviceTypes.list(
      parseFilters(filters.devicesTypes.filters ?? {}),
      pagination,
    )
      .then((result) => {
        setDevicesTypes(result.deviceTypes);
        dispatch(setStateDevicesTypes(result.deviceTypes));
        setTotalAndPage(result.pagination.total, addPage);
      })
      .catch((error) => {
        dispatchError(error.message);
      })
      .finally(() => noLoading());
  };

  useEffect(() => {
    setLoading(true);
    setSelectedProfiles([]);
    getProfiles(1);
  }, [filters.devicesTypes]);

  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setLoadingMore(true);
    getProfiles(page + 1, true);
  };

  const checkProfileCallback =
    (deviceId: string) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.checked) {
        setSelectedProfiles([...selectedProfiles, deviceId]);
      } else {
        setSelectedProfiles(
          selectedProfiles.filter((item) => item !== deviceId),
        );
      }
    };

  const handleSorting = (option: SortingOption): void => {
    dispatch(setSorting(option.value, 'devicesTypes'));
    setSelectedSorting(option);
  };

  const handleSelectView = (view: string): void => {
    dispatch(setViewOption(view, 'devicesTypes'));
    setSelectedView(view);
  };

  const handleTableSorting = (value: string): void => {
    console.info(value);
  };

  const handleSelectAll = (): void => {
    if (selectedProfiles.length !== devicesTypes.length) {
      setSelectedProfiles(devicesTypes.map((deviceType) => deviceType._id));
    } else {
      setSelectedProfiles([]);
    }
  };

  return (
    <Grid container direction="column" spacing={0}>
      <Header
        title="Profiles"
        link="new-device-profile"
        actionLabel="Create New Profile"
        model="device_type"
      />
      <DevicesProfilesFilters />
      <ListSelection
        selectedSorting={selectedSorting}
        selectedView={selectedView}
        sortingOptions={sortingOptions}
        viewsOptions={genericViewOptions}
        itemsSelected={selectedProfiles.length !== 0}
        allSelected={
          devicesTypes.length !== 0 &&
          selectedProfiles.length === devicesTypes.length
        }
        deleteAction={true}
        sortingCallback={handleSorting}
        selectAllCallback={handleSelectAll}
        selectViewCallback={handleSelectView}
      />
      {loading ? (
        <Grid container className="loading-container">
          <CircularProgress size={75} thickness={5} />
        </Grid>
      ) : (
        <>
          {selectedView === 'grid' && (
            <CardsGrid
              twoColumns={true}
              cards={devicesTypes.map((deviceType) => (
                <Card
                  checked={selectedProfiles.includes(deviceType._id)}
                  checkboxCallback={checkProfileCallback}
                  id={deviceType._id}
                  baseLink="/device-profile"
                  content={
                    <DeviceProfileCard
                      deviceType={deviceType}
                      company={stateUser?.userCompanies?.find(
                        (company) => company._id === deviceType.company_id,
                      )}
                    />
                  }
                />
              ))}
            />
          )}
          {selectedView === 'list' && (
            <SharedTable
              columns={DevicesProfilesColumns}
              rows={devicesTypes}
              sortBy={selectedSorting.value}
              sortDirection={
                selectedSorting.value.indexOf('-') === -1 ? 'asc' : 'desc'
              }
              allSelected={selectedProfiles.length === devicesTypes.length}
              loading={loading}
              selectedItemsIds={selectedProfiles}
              onRequestSort={handleTableSorting}
              selectAllCallback={handleSelectAll}
              checkboxCallback={checkProfileCallback}
            />
          )}

          {devicesTypes.length !== total && (
            <Grid
              item
              xs={12}
              className={clsx('mb-9', classes.loadMoreContainer)}
            >
              <Button variant="outlined" size="large" onClick={handleLoadMore}>
                {!loadingMore ? (
                  <Typography variant="button">Load more</Typography>
                ) : (
                  <CircularProgress size={25} />
                )}
              </Button>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default DevicesProfilesPage;
