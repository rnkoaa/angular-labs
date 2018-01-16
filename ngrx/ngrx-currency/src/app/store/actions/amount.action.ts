import { Action } from '@ngrx/store';

export const AMOUNT_CHANGED = '[Amount] Change';

export class AmountChanged implements Action {
  readonly type = AMOUNT_CHANGED;

  constructor(public payload: number) { }
}
