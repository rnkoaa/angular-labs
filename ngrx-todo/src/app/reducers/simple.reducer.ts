import { Action } from '@ngrx/store';

const INITIAL_STATE = 'Hello, World';
export function simpleReducer(state: string = INITIAL_STATE, action: Action) {
  console.log(action.type, state);

  switch (action.type) {
    case 'SPANISH':
      return state = 'Hola, Mundo';
    case 'FRENCH':
      return state = 'Bonjour le monde';
    default:
      return state = INITIAL_STATE;
  }
}
