import { Integration } from '@edgeiq/edgeiq-api-js';

export const IntegrationsTypes = {
  SET_INTEGRATIONS: 'SET_INTEGRATIONS',
  SET_ACTUAL_INTEGRATION: 'SET_ACTUAL_INTEGRATION',
  SET_SELECTED_INTEGRATIONS: 'SET_SELECTED_INTEGRATIONS',
};

export const setStateIntegrations = (
  integrations: Integration[],
): IntegrationsAction => ({
  type: IntegrationsTypes.SET_INTEGRATIONS,
  data: integrations,
});

export const setActualIntegration = (
  integration: Integration,
): IntegrationsAction => ({
  type: IntegrationsTypes.SET_ACTUAL_INTEGRATION,
  data: integration,
});

export const setSelectedIntegrations = (
  integrations: Integration[],
): IntegrationsAction => ({
  type: IntegrationsTypes.SET_SELECTED_INTEGRATIONS,
  data: integrations,
});

export type IntegrationsState = {
  integrations: Integration[];
  integration: Integration | null;
  selectedIntegrations: Integration[];
};

// INITIAL STATE
const integrationsInitialState: IntegrationsState = {
  integrations: [],
  integration: null,
  selectedIntegrations: [],
};

export type IntegrationsAction = {
  type: string;
  data: Integration[] | Integration;
};

const integrationsReducer = (
  state = integrationsInitialState,
  action: IntegrationsAction,
): IntegrationsState => {
  switch (action.type) {
    case IntegrationsTypes.SET_INTEGRATIONS:
      return {
        ...state,
        integrations: action.data as Integration[],
      };

    case IntegrationsTypes.SET_ACTUAL_INTEGRATION:
      return {
        ...state,
        integration: action.data as Integration,
      };

    case IntegrationsTypes.SET_SELECTED_INTEGRATIONS:
      return {
        ...state,
        selectedIntegrations: action.data as Integration[],
      };

    default:
      return state;
  }
};

export default integrationsReducer;
