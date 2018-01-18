import { Action } from '@ngrx/store';
import { Todo } from '../../models';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_DONE = 'TOGGLE_DONE';

export class AddTodo implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: { todo: Todo }) {}
}

export class DeleteTodo implements Action {
  readonly type = DELETE_TODO;

  constructor(public payload: { id: string }) {}
}

export class UpdateTodo implements Action {
  readonly type = UPDATE_TODO;

  constructor(public payload: { id: string; newValue: string }) {}
}

export class ToggleDone implements Action {
  readonly type = TOGGLE_DONE;

  constructor(public payload: { id: string; done: boolean }) {}
}

export type TodoActions = AddTodo | DeleteTodo | UpdateTodo | ToggleDone;

