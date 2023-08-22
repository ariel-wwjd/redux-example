import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import {
  Translator,
  Translators,
  PaginationFilter,
} from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setStateTranslators } from '../../../redux/reducers/translators.reducer';
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
import TranslatorCard from './TranslatorCard';
import { TranslatorsColumns } from './columns';
import useStyles from '../styles';

const TranslatorsPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.filters);
  const translatorsState = useAppSelector(
    (state: RootState) => state.translators,
  );

  const [selectedTranslators, setSelectedTranslators] = useState<string[]>([]);
  const [translators, setTranslators] = useState<Translator[]>(
    translatorsState.translators,
  );
  const [selectedSorting, setSelectedSorting] = useState<SortingOption>(
    getInitialSorting(filters.translators.sortBy, genericSorting),
  );
  const [selectedView, setSelectedView] = useState(filters.translators.view);
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

  const getTranslators = (pageNumber: number, addPage = false): void => {
    const pagination: PaginationFilter = {
      itemsPerPage: defaultItemsPerPage,
      page: pageNumber,
      order_by: selectedSorting.value,
    };

    Translators.list(
      parseFilters(filters.translators.filters ?? {}),
      pagination,
    )
      .then((result) => {
        setTranslators(result.translators);
        dispatch(setStateTranslators(result.translators));
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
    setSelectedTranslators([]);
    getTranslators(1);
  }, [filters.translators]);

  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setLoadingMore(true);
    getTranslators(page + 1, true);
  };

  const checkProfileCallback =
    (deviceId: string) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.checked) {
        setSelectedTranslators([...selectedTranslators, deviceId]);
      } else {
        setSelectedTranslators(
          selectedTranslators.filter((item) => item !== deviceId),
        );
      }
    };

  const handleSorting = (option: SortingOption): void => {
    dispatch(setSorting(option.value, 'translators'));
    setSelectedSorting(option);
  };

  const handleSelectView = (view: string): void => {
    dispatch(setViewOption(view, 'translators'));
    setSelectedView(view);
  };

  const handleTableSorting = (value: string): void => {
    console.info(value);
  };

  const handleSelectAll = (): void => {
    if (selectedTranslators.length !== translators.length) {
      setSelectedTranslators(translators.map((deviceType) => deviceType._id));
    } else {
      setSelectedTranslators([]);
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
    Translators.deleteMultiple(selectedTranslators)
      .then((_result) => {
        dispatch(
          setAlert({
            type: 'success',
            highlight: deleteHighlight(
              selectedTranslators.length,
              'Translator',
              'Translators',
            ),
          }),
        );
        setTranslators(
          translators.filter(
            (device) => !selectedTranslators.includes(device._id),
          ),
        );
        setSelectedTranslators([]);
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
          model="translator"
          action="create"
          label="Create New Translator"
          link="new-translator"
          margin={false}
        />
      </Grid>
      <ListSelection
        selectedSorting={selectedSorting}
        selectedView={selectedView}
        sortingOptions={genericSorting}
        viewsOptions={genericViewOptions}
        itemsSelected={selectedTranslators.length !== 0}
        allSelected={
          translators.length !== 0 &&
          selectedTranslators.length === translators.length
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
              cards={translators.map((translator) => (
                <Card
                  checked={selectedTranslators.includes(translator._id)}
                  checkboxCallback={checkProfileCallback}
                  id={translator._id}
                  baseLink="/translator"
                  content={<TranslatorCard translator={translator} />}
                />
              ))}
            />
          )}
          {selectedView === 'list' && (
            <SharedTable
              columns={TranslatorsColumns}
              rows={translators}
              sortBy={selectedSorting.value}
              sortDirection={
                selectedSorting.value.indexOf('-') === -1 ? 'asc' : 'desc'
              }
              allSelected={selectedTranslators.length === translators.length}
              loading={loading}
              selectedItemsIds={selectedTranslators}
              xPadding={false}
              onRequestSort={handleTableSorting}
              selectAllCallback={handleSelectAll}
              checkboxCallback={checkProfileCallback}
            />
          )}

          {translators.length !== total && (
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
              selectedTranslators.length === 1 ? 'translation' : 'translations'
            }:`}</span>
            <ul>
              {translators
                .filter((translation) =>
                  selectedTranslators.includes(translation._id),
                )
                .map((translation) => (
                  <li key={translation._id}>{translation.name}</li>
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

export default TranslatorsPage;
