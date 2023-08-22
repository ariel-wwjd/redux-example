import { PollableAttribute } from '@edgeiq/edgeiq-api-js';

export const PollableAttributesTypes = {
  SET_POLLABLE_ATTRIBUTES: 'SET_POLLABLE_ATTRIBUTES',
  SET_ACTUAL_POLLABLE_ATTRIBUTE: 'SET_ACTUAL_POLLABLE_ATTRIBUTE',
  SET_SELECTED_POLLABLE_ATTRIBUTES: 'SET_SELECTED_POLLABLE_ATTRIBUTES',
};

export const setStatePollableAttributes = (
  pollableAttributes: PollableAttribute[],
): PollableAttributesAction => ({
  type: PollableAttributesTypes.SET_POLLABLE_ATTRIBUTES,
  data: pollableAttributes,
});

export const setActualPollableAttribute = (
  pollableAttribute: PollableAttribute,
): PollableAttributesAction => ({
  type: PollableAttributesTypes.SET_ACTUAL_POLLABLE_ATTRIBUTE,
  data: pollableAttribute,
});

export const setSelectedPollableAttributes = (
  pollableAttributes: PollableAttribute[],
): PollableAttributesAction => ({
  type: PollableAttributesTypes.SET_SELECTED_POLLABLE_ATTRIBUTES,
  data: pollableAttributes,
});

export type PollableAttributesState = {
  pollableAttributes: PollableAttribute[];
  pollableAttribute: PollableAttribute | null;
  selectedPollableAttributes: PollableAttribute[];
};

// INITIAL STATE
const pollableAttributesInitialState: PollableAttributesState = {
  pollableAttributes: [],
  pollableAttribute: null,
  selectedPollableAttributes: [],
};

export type PollableAttributesAction = {
  type: string;
  data: PollableAttribute[] | PollableAttribute;
};

const pollableAttributesReducer = (
  state = pollableAttributesInitialState,
  action: PollableAttributesAction,
): PollableAttributesState => {
  switch (action.type) {
    case PollableAttributesTypes.SET_POLLABLE_ATTRIBUTES:
      return {
        ...state,
        pollableAttributes: action.data as PollableAttribute[],
      };

    case PollableAttributesTypes.SET_ACTUAL_POLLABLE_ATTRIBUTE:
      return {
        ...state,
        pollableAttribute: action.data as PollableAttribute,
      };

    case PollableAttributesTypes.SET_SELECTED_POLLABLE_ATTRIBUTES:
      return {
        ...state,
        selectedPollableAttributes: action.data as PollableAttribute[],
      };

    default:
      return state;
  }
};

export default pollableAttributesReducer;
