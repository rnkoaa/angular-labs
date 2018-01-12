import { environment } from '../../../environments/environment';
import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer, State } from '@ngrx/store';
import { Currency } from '../../models/currency.model';
import * as fromAmount from './amount.reducer';
import * as fromCurrency from './currency.reducer';
import { AppState } from './app.state';
import { CurrencyState, AmountState } from '../index';

export const getCurrencyState = createFeatureSelector<CurrencyState>('currencyState');
export const getAmountState = createFeatureSelector<AmountState>('amountState');

export const getCurrencies = createSelector(
  getCurrencyState,
  (state: CurrencyState) => state.currencies
);

export const getAmount = createSelector(
  getAmountState,
  (state: AmountState) => state.amount
);

export const reducers: ActionReducerMap<AppState> = {
  currencyState: fromCurrency.reducer,
  amountState: fromAmount.reducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

