import { GithubResponse } from '../../../models';

import * as fromRepoActions from '../actions/repo.actions';

const initialResponse: GithubResponse = {};

export interface ReposState {
  data: GithubResponse;
  loaded: boolean;
  loading: boolean;
}

const initialState: ReposState = {
  data: initialResponse,
  loading: true,
  loaded: false
};

export const reducer = (
  state = initialState,
  action: fromRepoActions.RepoActions
): ReposState => {
  switch (action.type) {
    case fromRepoActions.GET_REPOS:
      return {
        ...state,
        loading: true
      };
    case fromRepoActions.GET_REPOS_SUCCESS:
      const response: ReposState = {
        ...state,
        loading: false,
        loaded: true
      };
      response.data = action.payload;
      return response;
    case fromRepoActions.GET_REPOS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    default:
      return state;
  }
};
