import { Rule } from '@edgeiq/edgeiq-api-js';

interface AdaptedRule extends Rule {
  is_from_device_type?: boolean;
}

export const PoliciesTypes = {
  SET_POLICIES: 'SET_POLICIES',
  SET_ACTUAL_POLICY: 'SET_ACTUAL_POLICY',
  SET_SELECTED_POLICIES: 'SET_SELECTED_POLICIES',
  SET_ORIGINAL_SELECTED_POLICIES: 'SET_ORIGINAL_SELECTED_POLICIES',
};

export const setStatePolicies = (policies: Rule[]): PoliciesAction => ({
  type: PoliciesTypes.SET_POLICIES,
  data: policies,
});

export const setActualPolicy = (policy: Rule): PoliciesAction => ({
  type: PoliciesTypes.SET_ACTUAL_POLICY,
  data: policy,
});

export const setSelectedPolicies = (policies: Rule[]): PoliciesAction => ({
  type: PoliciesTypes.SET_SELECTED_POLICIES,
  data: policies,
});

export const setOriginalSelectedPolicies = (
  policies: Rule[],
): PoliciesAction => ({
  type: PoliciesTypes.SET_ORIGINAL_SELECTED_POLICIES,
  data: policies,
});

export type PoliciesState = {
  policies: Rule[];
  policy: Rule | null;
  selectedPolicies: Rule[];
  originalSelectedPolicies: AdaptedRule[];
};

// INITIAL STATE
const policiesInitialState: PoliciesState = {
  policies: [],
  policy: null,
  selectedPolicies: [],
  originalSelectedPolicies: [],
};

export type PoliciesAction = {
  type: string;
  data: Rule[] | Rule;
};

const policiesReducer = (
  state = policiesInitialState,
  action: PoliciesAction,
): PoliciesState => {
  switch (action.type) {
    case PoliciesTypes.SET_POLICIES:
      return {
        ...state,
        policies: action.data as Rule[],
      };

    case PoliciesTypes.SET_ACTUAL_POLICY:
      return {
        ...state,
        policy: action.data as Rule,
      };

    case PoliciesTypes.SET_SELECTED_POLICIES:
      return {
        ...state,
        selectedPolicies: action.data as Rule[],
      };
    case PoliciesTypes.SET_ORIGINAL_SELECTED_POLICIES:
      return {
        ...state,
        originalSelectedPolicies: action.data as AdaptedRule[],
      };

    default:
      return state;
  }
};

export default policiesReducer;
