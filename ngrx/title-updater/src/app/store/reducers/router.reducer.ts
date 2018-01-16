import * as fromRouter from '@ngrx/router-store';
import { RouterStateTitle } from '../../shared/utils';
import { createFeatureSelector } from '@ngrx/store';

export interface State {
  router: fromRouter.RouterReducerState<RouterStateTitle>;
}

export const reducers = {
  router: fromRouter.routerReducer
};

// While we won't be using this in this post,
// selectors provide an easy way to access pieces of store using store.select(SELECTOR) to return an Observable of
// that state subset and only emit a new value if it changes.
export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateTitle>>('router');
