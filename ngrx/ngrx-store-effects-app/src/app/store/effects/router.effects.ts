import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

import * as RouterActions from '../actions/router.actions';
import * as fromReducers from '../reducers';

import { tap, map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable()
export class RouterEffects {

  @Effect({ dispatch: false })
  updateTitle$ = this.actions$
    .ofType(ROUTER_NAVIGATION).pipe(
      tap((action: RouterNavigationAction<fromReducers.RouterStateUrl>) => {
        if(action && action.payload.routerState.title){
          this.titleService.setTitle(action.payload.routerState.title);
        }
      })
    );


  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(RouterActions.GO).pipe(
    map((action: RouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.ofType(RouterActions.BACK).pipe(
    tap(() => {
      this.location.back;
    })
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.ofType(RouterActions.FORWARD).pipe(
    tap(() => {
      this.location.forward;
    })
  );

  constructor(
    private actions$: Actions,
    private location: Location,
    private router: Router,
    private titleService: Title
  ) {}
}
