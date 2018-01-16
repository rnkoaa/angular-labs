import { Injectable } from '@angular/core';
import { CurrencyService } from '../../services';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as currencyActions from '../actions/currency.action';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class CurrencyEffects {

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(currencyActions.CURRENCY_UPDATE)
    .switchMap(() =>
      this.currencyService
        .getRates()
        .map(data => {
          return new currencyActions.CurrencyUpdatedAction(data);
        })
    );

  constructor(
    private currencyService: CurrencyService,
    private actions$: Actions
  ) { }
}
