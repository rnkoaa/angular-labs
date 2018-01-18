import { Action } from '@ngrx/store';
import { GithubRepository, GithubResponse } from '../../../models';
import { HttpParams } from '@angular/common/http/src/params';

export const GET_REPOS = '[Repos] Get Repos';
export const GET_REPOS_SUCCESS = '[Repos] Get Repos Success';
export const GET_REPOS_FAILURE = '[Repos] Get Repos Failure';

export class GetRepos implements Action {
  readonly type = GET_REPOS;

  constructor(public payload: HttpParams) {}
}

export class GetReposSuccess implements Action {
  readonly type = GET_REPOS_SUCCESS;

  constructor(public payload: GithubResponse) {}
}

export class GetReposFailure implements Action {
  readonly type = GET_REPOS_FAILURE;

  constructor(public payload: string) {}
}

export type RepoActions = GetRepos | GetReposSuccess | GetReposFailure;
