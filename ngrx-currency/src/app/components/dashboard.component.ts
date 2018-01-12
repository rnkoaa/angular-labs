import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store';
import * as fromActions from '../store/actions';
import { Observable } from 'rxjs/Observable';
import { Currency } from '../models/currency.model';
import { AppState } from '../store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  amount$: Observable<number>;
  public currencyRates$: Observable<Currency[]>;

  constructor(private store: Store<fromRoot.CurrencyState>) {
    this.currencyRates$ = this.store.select(fromRoot.getCurrencies);
    this.amount$ = this.store.select(fromRoot.getAmount);

  }

  ngOnInit() {
    // this.currencyRates$.subscribe(currencies => {
    //   console.log(currencies);
    // });
    this.store.dispatch(new fromActions.CurrencyUpdateAction());
  }

  onAmountChange(amount: string) {
    const number = parseFloat(amount);
    if (!isNaN(number)) {
      this.store.dispatch(new fromActions.AmountChanged(number));
    }
  }

}
