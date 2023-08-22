import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Rule, Rules, PaginationFilter } from '@edgeiq/edgeiq-api-js';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { setStatePolicies } from '../../redux/reducers/policies.reducer';
import {
  setSorting,
  setViewOption,
} from '../../redux/reducers/filters.reducer';
import { setAlert } from '../../redux/reducers/alert.reducer';
import {
  defaultItemsPerPage,
  deleteHighlight,
  errorHighlight,
  genericViewOptions,
} from '../../app/constants';
import { SortingOption, genericSorting } from '../../models/common';
import getInitialSorting from '../../helpers/getInitialSorting';
import parseFilters from '../../helpers/parseFilters';
import ListSelection from '../../components/ListSelection';
import SharedTable from '../../components/SharedTable';
import CardsGrid from '../../components/CardsGrid';
import Card from '../../components/Card';
import DeleteDialog from '../../components/DeleteDialog';
import AttachPolicyCard from '../../components/RightDrawer/AttachPolicies/AttachPolicyCard';
import Header from '../../components/Header';
import { PoliciesColumns } from './columns';

const PoliciesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.filters);
  const policiesState = useAppSelector((state: RootState) => state.policies);

  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [policies, setPolicies] = useState<Rule[]>(policiesState.policies);
  const [selectedSorting, setSelectedSorting] = useState<SortingOption>(
    getInitialSorting(filters.policies.sortBy, genericSorting),
  );
  const [selectedView, setSelectedView] = useState(filters.policies.view);
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

  const getPolicies = (pageNumber: number, addPage = false): void => {
    const pagination: PaginationFilter = {
      itemsPerPage: defaultItemsPerPage,
      page: pageNumber,
      order_by: selectedSorting.value,
    };

    Rules.list(parseFilters(filters.policies.filters ?? {}), pagination)
      .then((result) => {
        setPolicies(result.rules);
        dispatch(setStatePolicies(result.rules));
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
    setSelectedPolicies([]);
    getPolicies(1);
  }, [filters.policies]);

  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setLoadingMore(true);
    getPolicies(page + 1, true);
  };

  const checkProfileCallback =
    (deviceId: string) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.checked) {
        setSelectedPolicies([...selectedPolicies, deviceId]);
      } else {
        setSelectedPolicies(
          selectedPolicies.filter((item) => item !== deviceId),
        );
      }
    };

  const handleSorting = (option: SortingOption): void => {
    dispatch(setSorting(option.value, 'policies'));
    setSelectedSorting(option);
  };

  const handleSelectView = (view: string): void => {
    dispatch(setViewOption(view, 'policies'));
    setSelectedView(view);
  };

  const handleTableSorting = (value: string): void => {
    console.info(value);
  };

  const handleSelectAll = (): void => {
    if (selectedPolicies.length !== policies.length) {
      setSelectedPolicies(policies.map((deviceType) => deviceType._id));
    } else {
      setSelectedPolicies([]);
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
    Rules.deleteMultiple(selectedPolicies)
      .then((_result) => {
        dispatch(
          setAlert({
            type: 'success',
            highlight: deleteHighlight(
              selectedPolicies.length,
              'Policy',
              'Policies',
            ),
          }),
        );
        setPolicies(
          policies.filter((device) => !selectedPolicies.includes(device._id)),
        );
        setSelectedPolicies([]);
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
      <Header
        title="Policies"
        link="new-policy"
        actionLabel="Create New Policy"
        model="rule"
      />
      <ListSelection
        selectedSorting={selectedSorting}
        selectedView={selectedView}
        sortingOptions={genericSorting}
        viewsOptions={genericViewOptions}
        itemsSelected={selectedPolicies.length !== 0}
        allSelected={
          policies.length !== 0 && selectedPolicies.length === policies.length
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
              cards={policies.map((policy) => (
                <Card
                  checked={selectedPolicies.includes(policy._id)}
                  checkboxCallback={checkProfileCallback}
                  id={policy._id}
                  baseLink="/policy"
                  content={<AttachPolicyCard policy={policy} />}
                />
              ))}
            />
          )}
          {selectedView === 'list' && (
            <SharedTable
              columns={PoliciesColumns}
              rows={policies}
              sortBy={selectedSorting.value}
              sortDirection={
                selectedSorting.value.indexOf('-') === -1 ? 'asc' : 'desc'
              }
              allSelected={selectedPolicies.length === policies.length}
              loading={loading}
              selectedItemsIds={selectedPolicies}
              onRequestSort={handleTableSorting}
              selectAllCallback={handleSelectAll}
              checkboxCallback={checkProfileCallback}
            />
          )}

          {policies.length !== total && (
            <Grid item xs={12} className="mb-9 loading-container">
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
              selectedPolicies.length === 1 ? 'policy' : 'policies'
            }:`}</span>
            <ul>
              {policies
                .filter((policy) => selectedPolicies.includes(policy._id))
                .map((policy) => (
                  <li key={policy._id}>{policy.description}</li>
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

export default PoliciesPage;
