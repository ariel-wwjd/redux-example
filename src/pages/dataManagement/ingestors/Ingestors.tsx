import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import {
  Ingestor,
  Ingestors,
  PaginationFilter,
  Translator,
  Translators,
} from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setStateIngestors } from '../../../redux/reducers/ingestors.reducer';
import {
  setSorting,
  setViewOption,
} from '../../../redux/reducers/filters.reducer';
import { setAlert } from '../../../redux/reducers/alert.reducer';
import { setStateTranslators } from '../../../redux/reducers/translators.reducer';
import {
  defaultItemsPerPage,
  deleteHighlight,
  errorHighlight,
  genericViewOptions,
  optionsPaginationsFilter,
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
import IngestorCard from './IngestorCard';
import { IngestorsColumns } from './columns';
import useStyles from '../styles';

const IngestorsPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.filters);
  const ingestorsState = useAppSelector((state: RootState) => state.ingestors);
  const translatorsState = useAppSelector(
    (state: RootState) => state.translators,
  );

  const [selectedIngestors, setSelectedIngestors] = useState<string[]>([]);
  const [ingestors, setIngestors] = useState<Ingestor[]>(
    ingestorsState.ingestors,
  );
  const [translators, setTranslators] = useState<Translator[]>(
    translatorsState.translators,
  );
  const [selectedSorting, setSelectedSorting] = useState<SortingOption>(
    getInitialSorting(filters.ingestors.sortBy, genericSorting),
  );
  const [selectedView, setSelectedView] = useState(filters.ingestors.view);
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

  const getIngestors = (pageNumber: number, addPage = false): void => {
    const pagination: PaginationFilter = {
      itemsPerPage: defaultItemsPerPage,
      page: pageNumber,
      order_by: selectedSorting.value,
    };

    Ingestors.list(parseFilters(filters.ingestors.filters ?? {}), pagination)
      .then((result) => {
        setIngestors(result.ingestors);
        dispatch(setStateIngestors(result.ingestors));
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
    if (translators.length === 0) {
      Translators.list({}, optionsPaginationsFilter)
        .then((result) => {
          setTranslators(result.translators);
          dispatch(setStateTranslators(result.translators));
        })
        .catch((error) => {
          dispatchError(error.message);
        });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setSelectedIngestors([]);
    getIngestors(1);
  }, [filters.ingestors]);

  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setLoadingMore(true);
    getIngestors(page + 1, true);
  };

  const checkProfileCallback =
    (deviceId: string) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.checked) {
        setSelectedIngestors([...selectedIngestors, deviceId]);
      } else {
        setSelectedIngestors(
          selectedIngestors.filter((item) => item !== deviceId),
        );
      }
    };

  const handleSorting = (option: SortingOption): void => {
    dispatch(setSorting(option.value, 'ingestors'));
    setSelectedSorting(option);
  };

  const handleSelectView = (view: string): void => {
    dispatch(setViewOption(view, 'ingestors'));
    setSelectedView(view);
  };

  const handleTableSorting = (value: string): void => {
    console.info(value);
  };

  const handleSelectAll = (): void => {
    if (selectedIngestors.length !== ingestors.length) {
      setSelectedIngestors(ingestors.map((deviceType) => deviceType._id));
    } else {
      setSelectedIngestors([]);
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
    Ingestors.deleteMultiple(selectedIngestors)
      .then((_result) => {
        dispatch(
          setAlert({
            type: 'success',
            highlight: deleteHighlight(
              selectedIngestors.length,
              'Ingestor',
              'Ingestors',
            ),
          }),
        );
        setIngestors(
          ingestors.filter((device) => !selectedIngestors.includes(device._id)),
        );
        setSelectedIngestors([]);
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
          model="ingestor"
          action="create"
          label="Create New Ingestor"
          link="new-ingestor"
          margin={false}
        />
      </Grid>
      <ListSelection
        selectedSorting={selectedSorting}
        selectedView={selectedView}
        sortingOptions={genericSorting}
        viewsOptions={genericViewOptions}
        itemsSelected={selectedIngestors.length !== 0}
        allSelected={
          ingestors.length !== 0 &&
          selectedIngestors.length === ingestors.length
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
              cards={ingestors.map((ingestor) => (
                <Card
                  checked={selectedIngestors.includes(ingestor._id)}
                  checkboxCallback={checkProfileCallback}
                  id={ingestor._id}
                  baseLink="/ingestor"
                  content={
                    <IngestorCard
                      ingestor={ingestor}
                      translator={translators.find(
                        (translator) =>
                          translator._id === ingestor.translator_id,
                      )}
                    />
                  }
                />
              ))}
            />
          )}
          {selectedView === 'list' && (
            <SharedTable
              columns={IngestorsColumns}
              rows={ingestors}
              sortBy={selectedSorting.value}
              sortDirection={
                selectedSorting.value.indexOf('-') === -1 ? 'asc' : 'desc'
              }
              allSelected={selectedIngestors.length === ingestors.length}
              loading={loading}
              selectedItemsIds={selectedIngestors}
              xPadding={false}
              onRequestSort={handleTableSorting}
              selectAllCallback={handleSelectAll}
              checkboxCallback={checkProfileCallback}
            />
          )}

          {ingestors.length !== total && (
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
              selectedIngestors.length === 1 ? 'ingstor' : 'ingstors'
            }:`}</span>
            <ul>
              {ingestors
                .filter((ingstor) => selectedIngestors.includes(ingstor._id))
                .map((ingstor) => (
                  <li key={ingstor._id}>{ingstor.name}</li>
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

export default IngestorsPage;
