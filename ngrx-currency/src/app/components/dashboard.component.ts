import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store';
import * as fromActions from '../store/actions';
import { Observable } from 'rxjs/Observable';
import { Currency } from '../models/currency.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  amount$: Observable<number>;
  currencies$: Observable<Currency[]>;

  constructor(private store: Store<fromRoot.AppState>) {
    this.amount$ = this.store.select(fromRoot.getAmountState);
    this.currencies$ = this.store.select(fromRoot.getCurrnecyRates);
  }

  ngOnInit() {

  }

  onAmountChange(amount: string) {
    const number = parseFloat(amount);
    if (!isNaN(number)) {
      this.store.dispatch(new fromActions.AmountChanged(number));
    }
  }

}
