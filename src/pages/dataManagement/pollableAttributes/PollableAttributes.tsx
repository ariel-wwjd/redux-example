import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import {
  PollableAttribute,
  PollableAttributes,
  PaginationFilter,
} from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setStatePollableAttributes } from '../../../redux/reducers/pollableAttributes.reducer';
import {
  setSorting,
  setViewOption,
} from '../../../redux/reducers/filters.reducer';
import { setAlert } from '../../../redux/reducers/alert.reducer';
import {
  defaultItemsPerPage,
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
import PollableAttributeCard from './PollableAttributeCard';
import { PollableAttributesColumns } from './columns';
import useStyles from '../styles';

const PollableAttributesPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.filters);
  const pollableAttributesState = useAppSelector(
    (state: RootState) => state.pollableAttributes,
  );

  const [selectedPollableAttributes, setSelectedPollableAttributes] = useState<
    string[]
  >([]);
  const [pollableAttributes, setPollableAttributes] = useState<
    PollableAttribute[]
  >(pollableAttributesState.pollableAttributes);
  const [selectedSorting, setSelectedSorting] = useState<SortingOption>(
    getInitialSorting(filters.pollableAttributes.sortBy, genericSorting),
  );
  const [selectedView, setSelectedView] = useState(
    filters.pollableAttributes.view,
  );
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const dispatchError = (errorMessage: string): void => {
    dispatch(
      setAlert({
        type: 'error',
        highlight: errorHighlight,
        message: errorMessage,
      }),
    );
  };

  const getPollableAttributes = (pageNumber: number, addPage = false): void => {
    const pagination: PaginationFilter = {
      itemsPerPage: defaultItemsPerPage,
      page: pageNumber,
      order_by: selectedSorting.value,
    };

    PollableAttributes.list(
      parseFilters(filters.pollableAttributes.filters ?? {}),
      pagination,
    )
      .then((result) => {
        setPollableAttributes(result.pollableAttributes);
        dispatch(setStatePollableAttributes(result.pollableAttributes));
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
    setSelectedPollableAttributes([]);
    getPollableAttributes(1);
  }, [filters.pollableAttributes]);

  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setLoadingMore(true);
    getPollableAttributes(page + 1, true);
  };

  const checkProfileCallback =
    (deviceId: string) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.checked) {
        setSelectedPollableAttributes([
          ...selectedPollableAttributes,
          deviceId,
        ]);
      } else {
        setSelectedPollableAttributes(
          selectedPollableAttributes.filter((item) => item !== deviceId),
        );
      }
    };

  const handleSorting = (option: SortingOption): void => {
    dispatch(setSorting(option.value, 'pollableAttributes'));
    setSelectedSorting(option);
  };

  const handleSelectView = (view: string): void => {
    dispatch(setViewOption(view, 'pollableAttributes'));
    setSelectedView(view);
  };

  const handleTableSorting = (value: string): void => {
    console.info(value);
  };

  const handleSelectAll = (): void => {
    if (selectedPollableAttributes.length !== pollableAttributes.length) {
      setSelectedPollableAttributes(
        pollableAttributes.map((deviceType) => deviceType._id),
      );
    } else {
      setSelectedPollableAttributes([]);
    }
  };

  return (
    <Grid container direction="column" spacing={0}>
      <Grid item xs={12}>
        <ActionButton
          model="pollable_attribute"
          action="create"
          label="Create Pollable Attribute"
          link="new-pollableAttribute"
          margin={false}
        />
      </Grid>
      <ListSelection
        selectedSorting={selectedSorting}
        selectedView={selectedView}
        sortingOptions={genericSorting}
        viewsOptions={genericViewOptions}
        itemsSelected={selectedPollableAttributes.length !== 0}
        allSelected={
          pollableAttributes.length !== 0 &&
          selectedPollableAttributes.length === pollableAttributes.length
        }
        deleteAction={false}
        xPadding={false}
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
              containerPadding={false}
              cards={pollableAttributes.map((pollableAttribute) => (
                <Card
                  checked={selectedPollableAttributes.includes(
                    pollableAttribute._id,
                  )}
                  checkboxCallback={checkProfileCallback}
                  id={pollableAttribute._id}
                  baseLink="/pollableAttribute"
                  content={
                    <PollableAttributeCard
                      pollableAttribute={pollableAttribute}
                    />
                  }
                />
              ))}
            />
          )}
          {selectedView === 'list' && (
            <SharedTable
              columns={PollableAttributesColumns}
              rows={pollableAttributes}
              sortBy={selectedSorting.value}
              sortDirection={
                selectedSorting.value.indexOf('-') === -1 ? 'asc' : 'desc'
              }
              allSelected={
                selectedPollableAttributes.length === pollableAttributes.length
              }
              loading={loading}
              selectedItemsIds={selectedPollableAttributes}
              xPadding={false}
              onRequestSort={handleTableSorting}
              selectAllCallback={handleSelectAll}
              checkboxCallback={checkProfileCallback}
            />
          )}

          {pollableAttributes.length !== total && (
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

export default PollableAttributesPage;
