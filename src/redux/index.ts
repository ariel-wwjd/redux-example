import { CombinedState, combineReducers } from 'redux';

import alertReducer, {
  AlertAction,
  AlertState,
} from './reducers/alert.reducer';
import commandsReducer, {
  CommandsAction,
  CommandsState,
} from './reducers/commands.reducer';
import devicesReducer, {
  DevicesAction,
  DevicesState,
} from './reducers/devices.reducer';
import filtersReducer, {
  FiltersAction,
  FiltersState,
} from './reducers/filters.reducer';
import ingestorsReducer, {
  IngestorsAction,
  IngestorsState,
} from './reducers/ingestors.reducer';
import integrationsReducer, {
  IntegrationsAction,
  IntegrationsState,
} from './reducers/integrations.reducer';
import policiesReducer, {
  PoliciesAction,
  PoliciesState,
} from './reducers/policies.reducer';
import pollableAttributesReducer, {
  PollableAttributesAction,
  PollableAttributesState,
} from './reducers/pollableAttributes.reducer';
import translatorsReducer, {
  TranslatorsAction,
  TranslatorsState,
} from './reducers/translators.reducer';
import userRdeducer, {
  UserAction,
  UserState,
  UserTypes,
} from './reducers/user.reducer';

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  alert: alertReducer,
  commands: commandsReducer,
  devices: devicesReducer,
  filters: filtersReducer,
  ingestors: ingestorsReducer,
  integrations: integrationsReducer,
  policies: policiesReducer,
  pollableAttributes: pollableAttributesReducer,
  translators: translatorsReducer,
  user: userRdeducer,
});

const rootReducer = (
  state:
    | CombinedState<{
        alert: AlertState;
        commands: CommandsState;
        devices: DevicesState;
        filters: FiltersState;
        ingestors: IngestorsState;
        integrations: IntegrationsState;
        policies: PoliciesState;
        pollableAttributes: PollableAttributesState;
        translators: TranslatorsState;
        user: UserState;
      }>
    | undefined,
  action:
    | AlertAction
    | CommandsAction
    | DevicesAction
    | FiltersAction
    | IngestorsAction
    | IntegrationsAction
    | PoliciesAction
    | PollableAttributesAction
    | TranslatorsAction
    | UserAction,
): CombinedState<{
  alert: AlertState;
  commands: CommandsState;
  devices: DevicesState;
  filters: FiltersState;
  ingestors: IngestorsState;
  integrations: IntegrationsState;
  policies: PoliciesState;
  pollableAttributes: PollableAttributesState;
  translators: TranslatorsState;
  user: UserState;
}> => {
  if (action.type === UserTypes.LOGOUT_USER) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
