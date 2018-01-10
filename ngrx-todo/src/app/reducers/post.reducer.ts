import { Post } from '../models/post';
import * as PostActions from '../actions/post.actions';

export type Action = PostActions.All;

const defaultState: Post = {
  text: 'Default Post',
  likes: 0
};

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export function postReducer(state: Post = defaultState, action: Action) {
  switch (action.type) {
    case PostActions.EDIT_TEXT:
      return newState(state, { text: action.payload });
    case PostActions.UP_VOTE:
      return newState(state, { likes: state.likes + 1 });
    case PostActions.DOWN_VOTE:
      return newState(state, { likes: state.likes - 1 });
    case PostActions.RESET:
      return defaultState;
  }
}
