import { Dispatch } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AlertAction } from './reducers/alert.reducer';
import { CommandsAction } from './reducers/commands.reducer';
import { DevicesAction } from './reducers/devices.reducer';
import { FiltersAction } from './reducers/filters.reducer';
import { IngestorsAction } from './reducers/ingestors.reducer';
import { IntegrationsAction } from './reducers/integrations.reducer';
import { PoliciesAction } from './reducers/policies.reducer';
import { PollableAttributesAction } from './reducers/pollableAttributes.reducer';
import { TranslatorsAction } from './reducers/translators.reducer';
import { UserAction } from './reducers/user.reducer';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): Dispatch<
  | AlertAction
  | CommandsAction
  | DevicesAction
  | FiltersAction
  | IngestorsAction
  | IntegrationsAction
  | PoliciesAction
  | PollableAttributesAction
  | TranslatorsAction
  | UserAction
> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
