import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

export interface PizzaState extends EntityState<Pizza> {
  loaded: boolean;
  loading: boolean;
}

export const pizzaAdapter: EntityAdapter<Pizza> = createEntityAdapter<Pizza>();
export const initialState: PizzaState = pizzaAdapter.getInitialState({
  loaded: false,
  loading: false
});

export function reducer(
  state = initialState,
  action: fromPizzas.PizzasAction
): PizzaState {
  switch (action.type) {
    case fromPizzas.CREATE_PIZZA_SUCCESS: {
      const pizza = action.payload;

      return pizzaAdapter.addOne(pizza, {
        ...state,
        loaded: true,
        loading: false
      });
    }
    case fromPizzas.UPDATE_PIZZA_SUCCESS: {
      const pizza = action.payload;

      return pizzaAdapter.updateOne(
        {
          id: pizza.id,
          changes: {
            ...pizza
          }
        },
        state
      );
    }
    case fromPizzas.LOAD_PIZZAS: {
      console.log(action);
      return {
        ...state,
        loading: true
      };
    }
    case fromPizzas.DELETE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      return pizzaAdapter.removeOne(pizza.id, state);
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;

      return pizzaAdapter.addAll(pizzas, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

// export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;

export const {
  selectIds: getPizzaIds,
  selectEntities: getPizzasEntities,
  selectAll: getAllPizzas,
  selectTotal: pizzasCount
} = pizzaAdapter.getSelectors();
