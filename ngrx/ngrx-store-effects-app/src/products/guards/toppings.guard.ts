import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { tap, switchMap, take, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import * as fromStore from '../store';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators/filter';

@Injectable()
export class ToppingsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  public canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        return of(true);
      }),
      catchError(error => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getToppingsLoaded).pipe(
      tap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadToppings());
        }
      }),
      filter((loaded: boolean) => {
        return loaded;
      }),

      //after loaded. return the loaded value
      take(1)
    );
  }
}
