
import { Action, ActionReducer } from '@ngrx/store';

import * as fromActions from '../actions/currency.action';
import { AppState, INITIAL_APP_STATE, INITIAL_CURRENCY_STATE } from './app.state';
import { CurrencyState } from '../index';

export const reducer = (state = INITIAL_CURRENCY_STATE, action: fromActions.CurrencyUpdatedAction): CurrencyState => {
  switch (action.type) {
    case fromActions.CURRENCY_UPDATED:
      return {
        ...state,
        currencies: action.payload
      };
    default:
      return state;
  }
};

