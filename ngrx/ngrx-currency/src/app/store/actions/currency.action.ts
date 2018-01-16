import { Action } from '@ngrx/store';
import { Currency } from '../../models/currency.model';

export const CURRENCY_UPDATE = '[Currency] UpdateAll';
export const CURRENCY_UPDATED = '[Currency] UpdatedAll';

export class CurrencyUpdateAction implements Action {
  readonly type = CURRENCY_UPDATE;

  constructor() { }
}

export class CurrencyUpdatedAction implements Action {
  readonly type = CURRENCY_UPDATED;

  constructor(public payload: Currency[]) { }
}
