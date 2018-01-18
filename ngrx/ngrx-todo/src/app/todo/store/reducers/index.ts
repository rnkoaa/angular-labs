export * from './todo.reducer';

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';
import * as fromTodo from '../reducers/todo.reducer';
import { TodoState } from '../index';

export const reducers: ActionReducerMap<any> = {
  todo: fromTodo.todoReducer
};

export const selectTodoState = createFeatureSelector<fromTodo.TodoState>(
  'todo'
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = fromTodo.todoAdapter.getSelectors(selectTodoState);

export const getAllTodos = createSelector(
  selectTodoState,
  state => state.entities
);
