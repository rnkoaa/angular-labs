
import { Action, ActionReducer } from '@ngrx/store';

import * as fromActions from '../actions';

export const reducer = (state: number = 1, action: fromActions.AmountChanged) => {
  switch (action.type) {
    case fromActions.AMOUNT_CHANGED:
      return action.payload;
    default:
      return state;
  }
};
