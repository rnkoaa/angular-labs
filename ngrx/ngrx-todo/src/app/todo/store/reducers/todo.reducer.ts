import * as todoActions from '../actions/todo.actions';

import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Todo } from '../../models/todo.model';

export interface TodoState extends EntityState<Todo> {}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: TodoState = todoAdapter.getInitialState();

export function todoReducer(
  state: TodoState = initialState,
  action: todoActions.TodoActions
) {
  switch (action.type) {
    case todoActions.ADD_TODO:
      return todoAdapter.addOne(action.payload.todo, state);
    case todoActions.TOGGLE_DONE:
      return todoAdapter.updateOne(
        { id: action.payload.id, changes: { done: action.payload.done } },
        state
      );
    case todoActions.UPDATE_TODO:
      return todoAdapter.updateOne(
        { id: action.payload.id, changes: { value: action.payload.newValue } },
        state
      );
    case todoActions.DELETE_TODO:
      return todoAdapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}
