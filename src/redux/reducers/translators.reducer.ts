import { Translator } from '@edgeiq/edgeiq-api-js';

export const TranslatorsTypes = {
  SET_TRANSLATORS: 'SET_TRANSLATORS',
  SET_ACTUAL_TRANSLATOR: 'SET_ACTUAL_TRANSLATOR',
  SET_SELECTED_TRANSLATORS: 'SET_SELECTED_TRANSLATORS',
};

export const setStateTranslators = (
  translators: Translator[],
): TranslatorsAction => ({
  type: TranslatorsTypes.SET_TRANSLATORS,
  data: translators,
});

export const setActualTranslator = (
  translator: Translator,
): TranslatorsAction => ({
  type: TranslatorsTypes.SET_ACTUAL_TRANSLATOR,
  data: translator,
});

export const setSelectedTranslators = (
  translators: Translator[],
): TranslatorsAction => ({
  type: TranslatorsTypes.SET_SELECTED_TRANSLATORS,
  data: translators,
});

export type TranslatorsState = {
  translators: Translator[];
  translator: Translator | null;
  selectedTranslators: Translator[];
};

// INITIAL STATE
const translatorsInitialState: TranslatorsState = {
  translators: [],
  translator: null,
  selectedTranslators: [],
};

export type TranslatorsAction = {
  type: string;
  data: Translator[] | Translator;
};

const translatorsReducer = (
  state = translatorsInitialState,
  action: TranslatorsAction,
): TranslatorsState => {
  switch (action.type) {
    case TranslatorsTypes.SET_TRANSLATORS:
      return {
        ...state,
        translators: action.data as Translator[],
      };

    case TranslatorsTypes.SET_ACTUAL_TRANSLATOR:
      return {
        ...state,
        translator: action.data as Translator,
      };

    case TranslatorsTypes.SET_SELECTED_TRANSLATORS:
      return {
        ...state,
        selectedTranslators: action.data as Translator[],
      };

    default:
      return state;
  }
};

export default translatorsReducer;
