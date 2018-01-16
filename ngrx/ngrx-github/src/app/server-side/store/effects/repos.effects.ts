import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { RepoService } from '../../services';

import * as fromRepoActions from '../actions/repo.actions';
import { of } from 'rxjs/observable/of';
import { GetReposSuccess } from '../index';

@Injectable()
export class ReposEffects {
  @Effect()
  loadRepos$ = this.actions$.ofType(fromRepoActions.GET_REPOS).pipe(
    switchMap((action: fromRepoActions.GetRepos) => {
      return this.repoService
        .getRepos(action.payload)
        .pipe(
          map(repos => {
            console.log('executing effects');
            console.log(repos);
            return new fromRepoActions.GetReposSuccess(repos);
          ),
          catchError(error => of(new fromRepoActions.GetReposFailure(error)))
        );
    })
  );

  constructor(private actions$: Actions, private repoService: RepoService) {}
}
