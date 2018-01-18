import * as fromToppings from '../actions/toppings.action';
import { Topping } from '../../models/topping.model';
import { ToppingsAction } from 'src/products/store';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

// export interface ToppingState {
//   entities: { [id: number]: Topping };
//   loaded: boolean;
//   loading: boolean;
//   selectedToppings: number[];
// }

export interface ToppingState extends EntityState<Topping> {
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

// export const initialState: ToppingState = {
//   entities: {},
//   loaded: false,
//   loading: false,
//   selectedToppings: []
// };
export const toppingAdapter: EntityAdapter<Topping> = createEntityAdapter<
  Topping
>();
export const initialState: ToppingState = toppingAdapter.getInitialState({
  loaded: false,
  loading: false,
  selectedToppings: []
});

export function reducer(
  state = initialState,
  action: fromToppings.ToppingsAction
): ToppingState {
  switch (action.type) {
    case fromToppings.LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;
      return toppingAdapter.addAll(toppings, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case fromToppings.VISUALIZE_TOPPINGS: {
      const selectedToppings = action.payload;

      return {
        ...state,
        selectedToppings
      };
    }

    case fromToppings.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getToppingsLoading = (state: ToppingState) => state.loading;
export const getToppingsLoaded = (state: ToppingState) => state.loaded;
export const getSelectedToppings = (state: ToppingState) =>
  state.selectedToppings;

export const {
  selectIds: getToppingIds,
  selectEntities: getToppingsEntities,
  selectAll: getAllToppings,
  selectTotal: toppingsCount
} = toppingAdapter.getSelectors();
