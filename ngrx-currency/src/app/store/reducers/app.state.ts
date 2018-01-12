import { Currency } from '../../models/currency.model';


export interface AppState {
  currencyState: CurrencyState;
}

export interface CurrencyState {
  amount: number;
  currencies: Currency[];
}

export const INITIAL_CURRENCY_STATE: CurrencyState = {
  amount: 1,
  currencies: []
};

export const INITIAL_APP_STATE: AppState = {
  // amount: 1,
  // currencies: []
  currencyState: INITIAL_CURRENCY_STATE
};

