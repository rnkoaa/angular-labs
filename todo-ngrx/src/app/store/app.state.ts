import { TodoState, TodoListState, initializeTodoState, intializeTodoListState } from './todo.state';


export interface AppState {
  todoState: TodoState;
  todoListState: TodoListState;
}

export const initializeAppState: AppState = {
  todoListState: intializeTodoListState,
  todoState: initializeTodoState
};
