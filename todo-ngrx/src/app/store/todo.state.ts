import { Todo } from '../models';

export interface TodoState extends Todo {
  loading: boolean;

  editable: boolean;
  edited: boolean;
  editing: boolean;

  selected: boolean;
  refreshing: boolean;

  create: boolean;

  error: boolean;
}

export const INITIAL_TODO_STATE: TodoState = {
  ...Todo.generateMockTodo(),
  loading: false,

  editable: true,
  edited: false,
  editing: false,

  selected: false,
  refreshing: false,

  create: true,

  error: false,
};

export const initializeTodoState = function () {
  return {
    loading: false,

    editable: true,
    edited: false,
    editing: false,

    selected: false,
    refreshing: false,

    create: true,

    error: false,
  };
};

export interface TodoListState {
  todos: TodoState[];
  loading: boolean;
  pending: number;
}

export const INITIAL_TODO_LIST_STATE: TodoListState = {
  todos: [],
  loading: false,
  pending: 0,
};

export const intializeTodoListState = function () {
  return {
    loading: false,
    pending: 0,
  };
};

