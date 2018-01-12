
import { Action, ActionReducer } from '@ngrx/store';

import * as fromActions from '../actions';
import { AppState, INITIAL_APP_STATE,  INITIAL_CURRENCY_STATE} from './app.state';

export const reducer = (state = INITIAL_CURRENCY_STATE, action: fromActions.AmountChanged) => {
  switch (action.type) {
    case fromActions.AMOUNT_CHANGED:
      return {
        ...state,
        currencies: action.payload
      };
    default:
      return state;
  }
};
