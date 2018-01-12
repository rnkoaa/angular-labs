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
    // this.amount$ = this.store.select(state => state.amount);
    // this.amount$ = this.store.select(fromRoot.getAmountState);
    this.currencyRates$ = this.store.select(fromRoot.getCurrencies);

  }

  ngOnInit() {
    this.currencyRates$.subscribe(currencies => {
      console.log(currencies);
    });
    this.store.dispatch(new fromActions.CurrencyUpdateAction());

    // this.amount$.subscribe
    // this.amount$.subscribe(state => {
    //   console.log(JSON.stringify(state));
    // });
    // this.store.dispatch(new fromActions.CurrencyUpdateAction());

    // this.currencyRates$.subscribe(data => {
    //   console.log(data);
    // });
  }

  onAmountChange(amount: string) {
    // const number = parseFloat(amount);
    // if (!isNaN(number)) {
    //   this.store.dispatch(new fromActions.AmountChanged(number));
    // }
  }

}
