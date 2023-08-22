import { createStore, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './index';

const DEBUG = ['development', 'test'].includes(process.env.NODE_ENV);

let middlewares: Middleware[] = [thunk];

if (DEBUG) {
  middlewares = [...middlewares, logger];
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
