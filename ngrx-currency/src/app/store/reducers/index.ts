import { State } from '@ngrx/store';
import { Currency } from '../../models/currency.model';
import * as fromAmount from './amount.reducer';
import * as fromCurrency from './currency.reducer';

export interface AppState {
  amount: number;
  currencies: Currency[];
}

export const reducers = {
  amount: fromAmount.reducer,
  currency: fromCurrency.reducer
};

export const getAmountState = (state: AppState) => state.amount;
export const getCurrnecyRates = (state: AppState) => state.currencies;
