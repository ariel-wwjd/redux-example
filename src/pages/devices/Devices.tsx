import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import {
  Device,
  Devices,
  DeviceType,
  DeviceTypes,
  EscrowDevice,
  EscrowDevices,
  PaginationFilter,
} from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import {
  setStateDevices,
  setStateDevicesTypes,
  setStateEscrowDevices,
} from '../../redux/reducers/devices.reducer';
import {
  setSorting,
  setViewOption,
} from '../../redux/reducers/filters.reducer';
import { setAlert } from '../../redux/reducers/alert.reducer';
import Header from '../../components/Header';
import ListSelection from '../../components/ListSelection';
import Card from '../../components/Card';
import CardsGrid from '../../components/CardsGrid';
import SharedTable, {
  TableItemType,
  TableSubItemsType,
} from '../../components/SharedTable';
import DeleteDialog from '../../components/DeleteDialog';
import {
  defaultItemsPerPage,
  deleteHighlight,
  errorHighlight,
  genericViewOptions,
  optionsPaginationsFilter,
} from '../../app/constants';
import { SortingOption } from '../../models/common';
import getInitialSorting from '../../helpers/getInitialSorting';
import parseFilters from '../../helpers/parseFilters';
import DeviceCard from './DeviceCard';
import EscrowDeviceCard from './EscrowDeviceCard';
import DevicesFilter from './DevicesFilter';
import DevicesMetrics from './DevicesMetrics';
import DevicesExtraActions from './DevicesExtraActions';
import DevicesHeaderActions from './DevicesHeaderActions';
import DevicesGenre from './DevicesGenre';
import { sortingOptions, viewsOptions } from './constants';
import { DevicesColumns } from './columns';
import useStyles from './styles';

const DevicesPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.filters);
  const devicesState = useAppSelector((state: RootState) => state.devices);
  const isActive = devicesState.devicesGenre === 'active';
  const isEscrow = devicesState.devicesGenre === 'escrow';

  const [devices, setDevices] = useState<Device[]>([]);
  const [relatedDevices, setRelatedDevices] = useState<TableSubItemsType>();
  const [escrowDevices, setEscrowDevices] = useState<EscrowDevice[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [devicesTypes, setDevicesTypes] = useState<DeviceType[]>(
    devicesState.devicesTypes,
  );
  const [selectedSorting, setSelectedSorting] = useState<SortingOption>(
    getInitialSorting(filters.devices.sortBy, sortingOptions),
  );
  const [escrowSorting, setEscrowSorting] = useState<SortingOption>(
    getInitialSorting(filters.escrowDevices.sortBy, sortingOptions),
  );
  const [selectedView, setSelectedView] = useState(
    isActive ? filters.devices.view : filters.escrowDevices.view,
  );
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const dispatchError = (errorMessage: string, highlight?: string): void => {
    dispatch(
      setAlert({
        type: 'error',
        highlight: highlight ?? errorHighlight,
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

  const getDevices = (pageNumber: number, addPage = false): void => {
    const pagination: PaginationFilter = {
      itemsPerPage: defaultItemsPerPage,
      page: pageNumber,
      order_by: selectedSorting.value,
    };

    if (isActive) {
      Devices.list(parseFilters(filters.devices.filters ?? {}), pagination)
        .then((result) => {
          const newDevices = addPage
            ? [...devices, ...result.devices]
            : result.devices;
          setDevices(newDevices);
          dispatch(setStateDevices(newDevices));
          setTotalAndPage(result.pagination.total, addPage);
        })
        .catch((error) => {
          dispatchError(error.message);
        })
        .finally(() => noLoading());
    } else if (devicesState.devicesGenre === 'escrow') {
      EscrowDevices.list(
        parseFilters(filters.escrowDevices.filters ?? {}),
        pagination,
      )
        .then((result) => {
          const newEscrowDevices = addPage
            ? [...escrowDevices, ...result.escrowDevices]
            : result.escrowDevices;
          setEscrowDevices(newEscrowDevices);
          dispatch(setStateEscrowDevices(newEscrowDevices));
          setTotalAndPage(result.pagination.total, addPage);
        })
        .catch((error) => {
          dispatchError(error.message);
        })
        .finally(() => noLoading());
    }
  };

  useEffect(() => {
    if (devicesTypes.length === 0) {
      DeviceTypes.list({}, optionsPaginationsFilter)
        .then((result) => {
          setDevicesTypes(result.deviceTypes);
          dispatch(setStateDevicesTypes(result.deviceTypes));
        })
        .catch((error) => {
          dispatchError(error.message);
        });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setSelectedDevices([]);
    getDevices(1);
  }, [
    filters.devices,
    filters.escrowDevices,
    filters.discoveredDevices,
    devicesState.devicesGenre,
  ]);

  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setLoadingMore(true);
    getDevices(page + 1, true);
  };

  const checkDeviceCallback =
    (deviceId: string) =>
    (_event: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
      if (checked) {
        setSelectedDevices([...selectedDevices, deviceId]);
      } else {
        setSelectedDevices(selectedDevices.filter((item) => item !== deviceId));
      }
    };

  const handleSorting = (option: SortingOption): void => {
    if (isActive) {
      dispatch(setSorting(option.value, 'devices'));
      setSelectedSorting(option);
    } else {
      dispatch(setSorting(option.value, 'escrowDevices'));
      setEscrowSorting(option);
    }
  };

  const handleSelectView = (view: string): void => {
    dispatch(setViewOption(view, 'devices'));
    setSelectedView(view);
  };

  const handleTableSorting = (value: string): void => {
    console.info(value);
  };

  const handleSelectAll = (): void => {
    if (isActive && selectedDevices.length !== devices.length) {
      setSelectedDevices(devices.map((device) => device._id));
    } else if (
      devicesState.devicesGenre === 'escrow' &&
      selectedDevices.length !== escrowDevices.length
    ) {
      setSelectedDevices(escrowDevices.map((device) => device._id));
    } else {
      setSelectedDevices([]);
    }
  };

  const handleImportSucces = (): void => {
    getDevices(1);
  };

  const openDeleteModal = (): void => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteModal = (): void => {
    setDeleteDialogOpen(false);
  };

  const handleBulkDelete = (): void => {
    setLoadingDelete(true);
    if (isActive) {
      Devices.deleteMultiple(selectedDevices)
        .then((_result) => {
          dispatch(
            setAlert({
              type: 'success',
              highlight: deleteHighlight(
                selectedDevices.length,
                'Device',
                'Devices',
              ),
            }),
          );
          setDevices(
            devices.filter((device) => !selectedDevices.includes(device._id)),
          );
          setSelectedDevices([]);
        })
        .catch((error) => {
          dispatchError(error.message);
        })
        .finally(() => {
          setLoadingDelete(false);
          closeDeleteModal();
        });
    } else if (isEscrow) {
      EscrowDevices.deleteMultiple(selectedDevices)
        .then((_result) => {
          dispatch(
            setAlert({
              type: 'success',
              highlight: deleteHighlight(
                selectedDevices.length,
                'Escrow Device',
                'Escrow Devices',
              ),
            }),
          );
          setEscrowDevices(
            escrowDevices.filter(
              (device) => !selectedDevices.includes(device._id),
            ),
          );
          setSelectedDevices([]);
        })
        .catch((error) => {
          dispatchError(error.message);
        })
        .finally(() => {
          setLoadingDelete(false);
          closeDeleteModal();
        });
    }
  };

  const hasAttachedDevices = (item: TableItemType): boolean => {
    const device = item as Device;
    if (!device.attached_device_ids) {
      return false;
    }
    return device.attached_device_ids.length !== 0;
  };

  const getRelatedDevices = (item: TableItemType): void => {
    const device = item as Device;
    let result: TableSubItemsType = {};
    if (relatedDevices) {
      result = { ...relatedDevices };
    }
    if (!relatedDevices || !relatedDevices[item._id]) {
      // device.attached_device_ids in this case will absolutely have a value
      // as this action would never be triggered if it doesn't
      Devices.list(
        { _id: { operator: 'in', value: device.attached_device_ids ?? [] } },
        optionsPaginationsFilter,
      )
        .then((response) => {
          result[device._id] = response.devices;
          setRelatedDevices(result);
        })
        .catch((error) => {
          dispatchError(
            error.message,
            `Error getting related devices of: ${device.name}`,
          );
        });
    }
  };

  const allSelected = isActive
    ? devices.length !== 0 && selectedDevices.length === devices.length
    : escrowDevices.length !== 0 &&
      selectedDevices.length === escrowDevices.length;

  return (
    <Grid container direction="column" spacing={0}>
      <Header
        title="Devices"
        link="new-device"
        actionLabel="Add New Device"
        model={
          isActive ? 'device' : isEscrow ? 'escrow_device' : 'discovered_device'
        }
        extraActions={
          <DevicesHeaderActions onImportSuccess={handleImportSucces} />
        }
        nextTitleContent={<DevicesGenre />}
      />
      <DevicesFilter deviceTypes={devicesTypes} />
      {isActive && <DevicesMetrics />}
      <ListSelection
        selectedSorting={isActive ? selectedSorting : escrowSorting}
        selectedView={selectedView}
        sortingOptions={sortingOptions}
        viewsOptions={isActive ? viewsOptions : genericViewOptions}
        itemsSelected={selectedDevices.length !== 0}
        allSelected={allSelected}
        selectedActions={
          <DevicesExtraActions selectedDevices={selectedDevices} />
        }
        deleteAction={true}
        sortingCallback={handleSorting}
        selectAllCallback={handleSelectAll}
        selectViewCallback={handleSelectView}
        deleteCallback={openDeleteModal}
      />
      {loading ? (
        <Grid container className="loading-container">
          <CircularProgress size={75} thickness={5} />
        </Grid>
      ) : (
        <>
          {selectedView === 'grid' && (
            <CardsGrid
              cards={
                isActive
                  ? devices.map((device) => (
                      <Card
                        checked={selectedDevices.includes(device._id)}
                        checkboxCallback={checkDeviceCallback}
                        id={device._id}
                        baseLink="/device"
                        content={
                          <DeviceCard
                            device={device}
                            deviceType={devicesTypes.find(
                              (deviceType) => deviceType._id === device._id,
                            )}
                          />
                        }
                      />
                    ))
                  : escrowDevices.map((escrowDevice) => (
                      <Card
                        checked={selectedDevices.includes(escrowDevice._id)}
                        checkboxCallback={checkDeviceCallback}
                        id={escrowDevice._id}
                        content={
                          <EscrowDeviceCard escrowDevice={escrowDevice} />
                        }
                      />
                    ))
              }
            />
          )}
          {selectedView === 'list' && (
            <SharedTable
              columns={DevicesColumns(
                devicesTypes,
                classes,
                devicesState.devicesGenre,
              )}
              rows={isActive ? devices : escrowDevices}
              sortBy={selectedSorting.value}
              sortDirection={
                selectedSorting.value.indexOf('-') === -1 ? 'asc' : 'desc'
              }
              allSelected={allSelected}
              loading={loading}
              selectedItemsIds={selectedDevices}
              hasActionColumn={true}
              subRows={relatedDevices}
              onRequestSort={handleTableSorting}
              selectAllCallback={handleSelectAll}
              checkboxCallback={checkDeviceCallback}
              hasNestedTable={hasAttachedDevices}
              getRowSubItems={getRelatedDevices}
            />
          )}
          {selectedView === 'map' && <div>Map View</div>}
          {((isActive && devices.length !== total) ||
            (isEscrow && escrowDevices.length !== total)) && (
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
      <DeleteDialog
        open={deleteDialogOpen}
        loading={loadingDelete}
        content={
          <>
            <span>{`You are about to delete this ${
              selectedDevices.length === 1 ? 'device' : 'devices'
            }:`}</span>
            <ul>
              {isActive ? (
                devices
                  .filter((device) => selectedDevices.includes(device._id))
                  .map((device) => <li key={device._id}>{device.name}</li>)
              ) : isEscrow ? (
                escrowDevices
                  .filter((device) => selectedDevices.includes(device._id))
                  .map((device) => <li key={device._id}>{device.unique_id}</li>)
              ) : (
                <></>
              )}
            </ul>
          </>
        }
        onCloseCallback={closeDeleteModal}
        onDeleteCallback={handleBulkDelete}
      />
    </Grid>
  );
};

export default DevicesPage;
