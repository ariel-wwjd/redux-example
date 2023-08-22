import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import {
  Integration,
  Integrations,
  PaginationFilter,
} from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setStateIntegrations } from '../../../redux/reducers/integrations.reducer';
import {
  setSorting,
  setViewOption,
} from '../../../redux/reducers/filters.reducer';
import { setAlert } from '../../../redux/reducers/alert.reducer';
import {
  defaultItemsPerPage,
  deleteHighlight,
  errorHighlight,
  genericViewOptions,
} from '../../../app/constants';
import { SortingOption, genericSorting } from '../../../models/common';
import getInitialSorting from '../../../helpers/getInitialSorting';
import parseFilters from '../../../helpers/parseFilters';
import ListSelection from '../../../components/ListSelection';
import SharedTable from '../../../components/SharedTable';
import ActionButton from '../../../components/ActionButton';
import CardsGrid from '../../../components/CardsGrid';
import Card from '../../../components/Card';
import DeleteDialog from '../../../components/DeleteDialog';
import IntegrationCard from './IntegrationCard';
import { IntegrationsColumns } from './columns';
import useStyles from '../styles';

const IntegrationsPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.filters);
  const integrationsState = useAppSelector(
    (state: RootState) => state.integrations,
  );

  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(
    [],
  );
  const [integrations, setIntegrations] = useState<Integration[]>(
    integrationsState.integrations,
  );
  const [selectedSorting, setSelectedSorting] = useState<SortingOption>(
    getInitialSorting(filters.integrations.sortBy, genericSorting),
  );
  const [selectedView, setSelectedView] = useState(filters.integrations.view);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const dispatchError = (errorMessage: string): void => {
    dispatch(
      setAlert({
        type: 'error',
        highlight: errorHighlight,
        message: errorMessage,
      }),
    );
  };

  const getIntegrations = (pageNumber: number, addPage = false): void => {
    const pagination: PaginationFilter = {
      itemsPerPage: defaultItemsPerPage,
      page: pageNumber,
      order_by: selectedSorting.value,
    };

    Integrations.list(
      parseFilters(filters.integrations.filters ?? {}),
      pagination,
    )
      .then((result) => {
        setIntegrations(result.integrations);
        dispatch(setStateIntegrations(result.integrations));
        setTotal(result.pagination.total);
        if (addPage) {
          setPage(page + 1);
        }
      })
      .catch((error) => {
        dispatchError(error.message);
      })
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    setSelectedIntegrations([]);
    getIntegrations(1);
  }, [filters.integrations]);

  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setLoadingMore(true);
    getIntegrations(page + 1, true);
  };

  const checkProfileCallback =
    (deviceId: string) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.checked) {
        setSelectedIntegrations([...selectedIntegrations, deviceId]);
      } else {
        setSelectedIntegrations(
          selectedIntegrations.filter((item) => item !== deviceId),
        );
      }
    };

  const handleSorting = (option: SortingOption): void => {
    dispatch(setSorting(option.value, 'integrations'));
    setSelectedSorting(option);
  };

  const handleSelectView = (view: string): void => {
    dispatch(setViewOption(view, 'integrations'));
    setSelectedView(view);
  };

  const handleTableSorting = (value: string): void => {
    console.info(value);
  };

  const handleSelectAll = (): void => {
    if (selectedIntegrations.length !== integrations.length) {
      setSelectedIntegrations(integrations.map((deviceType) => deviceType._id));
    } else {
      setSelectedIntegrations([]);
    }
  };

  const openDeleteModal = (): void => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteModal = (): void => {
    setDeleteDialogOpen(false);
  };

  const handleBulkDelete = (): void => {
    setLoadingDelete(true);
    Integrations.deleteMultiple(selectedIntegrations)
      .then((_result) => {
        dispatch(
          setAlert({
            type: 'success',
            highlight: deleteHighlight(
              selectedIntegrations.length,
              'Integration',
              'Integrations',
            ),
          }),
        );
        setIntegrations(
          integrations.filter(
            (device) => !selectedIntegrations.includes(device._id),
          ),
        );
        setSelectedIntegrations([]);
      })
      .catch((error) => {
        dispatchError(error.message);
      })
      .finally(() => {
        setLoadingDelete(false);
        closeDeleteModal();
      });
  };

  return (
    <Grid container direction="column" spacing={0}>
      <Grid item xs={12}>
        <ActionButton
          model="integration"
          action="create"
          label="Create New Integration"
          link="new-integration"
          margin={false}
        />
      </Grid>
      <ListSelection
        selectedSorting={selectedSorting}
        selectedView={selectedView}
        sortingOptions={genericSorting}
        viewsOptions={genericViewOptions}
        itemsSelected={selectedIntegrations.length !== 0}
        allSelected={
          integrations.length !== 0 &&
          selectedIntegrations.length === integrations.length
        }
        deleteAction={true}
        xPadding={false}
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
              containerPadding={false}
              cards={integrations.map((integration) => (
                <Card
                  checked={selectedIntegrations.includes(integration._id)}
                  checkboxCallback={checkProfileCallback}
                  id={integration._id}
                  baseLink="/integration"
                  content={<IntegrationCard integration={integration} />}
                />
              ))}
            />
          )}
          {selectedView === 'list' && (
            <SharedTable
              columns={IntegrationsColumns}
              rows={integrations}
              sortBy={selectedSorting.value}
              sortDirection={
                selectedSorting.value.indexOf('-') === -1 ? 'asc' : 'desc'
              }
              allSelected={selectedIntegrations.length === integrations.length}
              loading={loading}
              selectedItemsIds={selectedIntegrations}
              xPadding={false}
              onRequestSort={handleTableSorting}
              selectAllCallback={handleSelectAll}
              checkboxCallback={checkProfileCallback}
            />
          )}

          {integrations.length !== total && (
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
              selectedIntegrations.length === 1 ? 'integration' : 'integrations'
            }:`}</span>
            <ul>
              {integrations
                .filter((integration) =>
                  selectedIntegrations.includes(integration._id),
                )
                .map((integration) => (
                  <li key={integration._id}>{integration.name}</li>
                ))}
            </ul>
          </>
        }
        onCloseCallback={closeDeleteModal}
        onDeleteCallback={handleBulkDelete}
      />
    </Grid>
  );
};

export default IntegrationsPage;
