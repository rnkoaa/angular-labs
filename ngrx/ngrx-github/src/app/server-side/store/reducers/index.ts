import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import * as fromReposReducers from './repos.reducers';
import { ReposState } from './repos.reducers';

// wrap repo state into products
export interface RepoModuleState {
  repos: fromReposReducers.ReposState;
}

export const reducers: ActionReducerMap<RepoModuleState> = {
  repos: fromReposReducers.reducer
};

export const getRepoModuleState = createFeatureSelector<RepoModuleState>(
  'repomodules'
);

export const getReposLoaded = (state: ReposState) => state.loaded;
export const getReposLoading = (state: ReposState) => state.loading;
export const getRepos = (state: ReposState) => state.data;

// repos state
export const getRepoState = createSelector(
  getRepoModuleState,
  (state: RepoModuleState) => state.repos
);

export const getAllRepos = createSelector(
  getRepoState,
  (state: ReposState) => state.data
);
export const getRepoLoading = createSelector(
  getRepoState,
  (state: ReposState) => state.loading
);
export const getRepoLoaded = createSelector(
  getRepoState,
  (state: ReposState) => state.loaded
);
