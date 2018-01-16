import { Currency } from '../../models/currency.model';


export interface AppState {
  currencyState: CurrencyState;
  amountState: AmountState;
}

export interface AmountState {
  amount: number;
}

export interface CurrencyState {
  currencies: Currency[];
}

export const INITIAL_CURRENCY_STATE: CurrencyState = {
  currencies: []
};
export const INITIAL_AMOUNT_STATE: AmountState = {
  amount: 1,
};

export const INITIAL_APP_STATE: AppState = {
  // amount: 1,
  // currencies: []
  currencyState: INITIAL_CURRENCY_STATE,
  amountState: INITIAL_AMOUNT_STATE
};

