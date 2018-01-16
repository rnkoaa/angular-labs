import { initializeTodoState, TodoState, TodoListState } from '../todo.state';
import { Todo } from '../../models';
import * as TodoActions from '../actions/todo.action';

const defaultTodoStates: TodoState[] = [
  {
    ...Todo.generateMockTodo(),
    ...initializeTodoState()
  }
];

const defaultState: TodoListState = {
  todos: defaultTodoStates,
  loading: false,
  pending: 0
};

export function TodoReducer(state = defaultState, action: TodoActions.All) {
  console.log(state, action);

  switch (action.type) {
    case TodoActions.GET_TODOS:
      return { ...state, loaded: false, loading: true };

    case TodoActions.GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: [
          ...action.payload,
          defaultTodoStates[0]
        ],
        loading: false
      };

    // case TodoActions.DELETE_TODO:
    //   return {
    //     ...state,
    //     ...state.todos.splice(state.todos.indexOf(action.payload), 1);
    //   };

    // case TodoActions.DELETE_TODO_SUCCESS:
    //   return state;

    // case TodoActions.DELETE_TODO_ERROR:
    //   return {
    //     ...state,
    //     todos: [
    //       ...state.todos,
    //       action.payload
    //     ]
    //   };
    default:
      return state;

  }
}
