import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ToppingsService } from '../../services';

import * as toppingsActions from '../actions/toppings.action';

import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class ToppingsEffects {
  @Effect()
  loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingService
        .getToppings()
        .pipe(
          map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
          catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private toppingService: ToppingsService
  ) {}
}
