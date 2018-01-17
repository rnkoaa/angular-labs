import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { tap, switchMap, map, filter, take, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import * as fromStore from '../store';
import { Store } from '@ngrx/store';
import { Pizza } from 'src/products/models/pizza.model';

@Injectable()
export class PizzaExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const pizzaId = parseInt(route.params.pizzaId);
        return this.hasPizza(pizzaId);
      }),
      catchError(error => of(false))
    );
  }

  hasPizza(id: number): Observable<boolean> {
    return this.store.select(fromStore.getPizzasEntities).pipe(
      map((entities: { [key: number]: Pizza }) => !!entities[id]),

      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      tap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadPizzas());
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
