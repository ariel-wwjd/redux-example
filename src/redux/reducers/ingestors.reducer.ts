import { Ingestor } from '@edgeiq/edgeiq-api-js';

export const IngestorsTypes = {
  SET_INGESTORS: 'SET_INGESTORS',
  SET_ACTUAL_INGESTOR: 'SET_ACTUAL_INGESTOR',
  SET_SELECTED_INGESTORS: 'SET_SELECTED_INGESTORS',
};

export const setStateIngestors = (ingestors: Ingestor[]): IngestorsAction => ({
  type: IngestorsTypes.SET_INGESTORS,
  data: ingestors,
});

export const setActualIngestor = (ingestor: Ingestor): IngestorsAction => ({
  type: IngestorsTypes.SET_ACTUAL_INGESTOR,
  data: ingestor,
});

export const setSelectedIngestors = (
  ingestors: Ingestor[],
): IngestorsAction => ({
  type: IngestorsTypes.SET_SELECTED_INGESTORS,
  data: ingestors,
});

export type IngestorsState = {
  ingestors: Ingestor[];
  ingestor: Ingestor | null;
  selectedIngestors: Ingestor[];
};

// INITIAL STATE
const ingestorsInitialState: IngestorsState = {
  ingestors: [],
  ingestor: null,
  selectedIngestors: [],
};

export type IngestorsAction = {
  type: string;
  data: Ingestor[] | Ingestor;
};

const ingestorsReducer = (
  state = ingestorsInitialState,
  action: IngestorsAction,
): IngestorsState => {
  switch (action.type) {
    case IngestorsTypes.SET_INGESTORS:
      return {
        ...state,
        ingestors: action.data as Ingestor[],
      };

    case IngestorsTypes.SET_ACTUAL_INGESTOR:
      return {
        ...state,
        ingestor: action.data as Ingestor,
      };

    case IngestorsTypes.SET_SELECTED_INGESTORS:
      return {
        ...state,
        selectedIngestors: action.data as Ingestor[],
      };

    default:
      return state;
  }
};

export default ingestorsReducer;
