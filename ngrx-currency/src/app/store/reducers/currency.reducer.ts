
import { Action, ActionReducer } from '@ngrx/store';

import * as fromActions from '../actions';


export const reducer = (state = [], action: fromActions.CurrencyUpdatedAction) => {
  switch (action.type) {
    case fromActions.CURRENCY_UPDATED:
      return action.payload;
    default:
      return state;
  }
};

