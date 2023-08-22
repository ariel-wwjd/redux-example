import React, { ChangeEvent, useEffect, useState } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import { Rule, Rules, RulesFilters } from '@edgeiq/edgeiq-api-js';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setAlert } from '../../../redux/reducers/alert.reducer';
import { setStatePolicies } from '../../../redux/reducers/policies.reducer';
import {
  errorHighlight,
  warningHighlight,
  optionsPaginationsFilter,
} from '../../../app/constants';
import CardsGrid from '../../CardsGrid';
import AttachItemsLayout from '../AttachItems/AttachItemsLayout';
import AttachItemCard from '../AttachItems/AttachItemCard';
import RightDrawer from '../RightDrawer';
import AttachPolicyCard from './AttachPolicyCard';

interface AttachPoliciesDrawerProps {
  open: boolean;
  itemPolicies: boolean;
  handleCloseDrawer: () => void;
  onChoosingPolicies: (policies: Rule[]) => void;
}

const AttachPoliciesDrawer: React.FC<AttachPoliciesDrawerProps> = ({
  open,
  itemPolicies,
  handleCloseDrawer,
  onChoosingPolicies,
}) => {
  const dispatch = useAppDispatch();
  const statePolicies = useAppSelector((state: RootState) => state.policies);

  const [policies, setPolicies] = useState<Rule[]>(statePolicies.policies);
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getPolicies = (searchName?: string): void => {
    setLoading(true);
    const filters: RulesFilters = {};
    if (searchName) {
      filters.description = {
        operator: 'like',
        value: searchName,
      };
    }
    Rules.list(filters, optionsPaginationsFilter)
      .then((result) => {
        setPolicies(result.rules);
        dispatch(setStatePolicies(result.rules));
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
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (policies.length === 0) {
      getPolicies();
    }
  }, []);

  useEffect(() => {
    if (itemPolicies && statePolicies.selectedPolicies.length !== 0) {
      setSelectedPolicies(
        statePolicies.selectedPolicies.map((policy) => policy._id),
      );
    }
  }, [statePolicies.selectedPolicies]);

  const handleOnChangeCallback = (value: string): void => {
    getPolicies(value);
  };

  const checkPolicyCallback =
    (policyId: string) =>
    (_event: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
      const fromDeviceType = statePolicies.originalSelectedPolicies.find(
        (originalPolicy) =>
          originalPolicy._id === policyId && originalPolicy.is_from_device_type,
      );

      if (fromDeviceType) {
        return dispatch(
          setAlert({
            type: 'warning',
            highlight: warningHighlight,
            message:
              "You can't remove rules that belongs to the Device Profile.",
          }),
        );
      }

      if (checked) {
        setSelectedPolicies([...selectedPolicies, policyId]);
      } else {
        setSelectedPolicies(
          selectedPolicies.filter((item) => item !== policyId),
        );
      }
    };

  const handlePoliciesCallback = (): void => {
    onChoosingPolicies(
      policies.filter((policy) => selectedPolicies.includes(policy._id)),
    );
  };

  const handleSelectAll = (): void => {
    if (selectedPolicies.length !== policies.length) {
      setSelectedPolicies(policies.map((policy) => policy._id));
    } else {
      setSelectedPolicies([]);
    }
  };

  return (
    <RightDrawer
      open={open}
      actionLabel="Attach"
      title="Select policies"
      disableAction={selectedPolicies.length === 0}
      actionCallback={handlePoliciesCallback}
      onCloseDrawer={handleCloseDrawer}
      content={
        <AttachItemsLayout
          allSelected={selectedPolicies.length === policies.length}
          itemsSelected={selectedPolicies.length !== 0}
          searchPlaceholder="Search policies"
          onChangeCallback={handleOnChangeCallback}
          selectAllCallback={handleSelectAll}
          grid={
            loading ? (
              <Grid container className="loading-container">
                <CircularProgress size={75} thickness={5} />
              </Grid>
            ) : (
              <CardsGrid
                twoColumns={true}
                containerPadding={false}
                cards={policies.map((policy) => (
                  <AttachItemCard
                    content={
                      <AttachPolicyCard key={policy._id} policy={policy} />
                    }
                    checked={selectedPolicies.includes(policy._id)}
                    checkboxCallback={checkPolicyCallback}
                    id={policy._id}
                  />
                ))}
              />
            )
          }
        />
      }
    />
  );
};

export default AttachPoliciesDrawer;
