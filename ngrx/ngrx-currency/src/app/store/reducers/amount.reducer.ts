
import { Action, ActionReducer } from '@ngrx/store';

import * as fromActions from '../actions';
import { AmountState, INITIAL_APP_STATE, INITIAL_AMOUNT_STATE } from './app.state';

export const reducer = (state = INITIAL_AMOUNT_STATE, action: fromActions.AmountChanged): AmountState => {
  switch (action.type) {
    case fromActions.AMOUNT_CHANGED:
      return {
        ...state,
        amount: action.payload
      };
    default:
      return state;
  }
};
