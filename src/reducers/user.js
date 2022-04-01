import { SAVE_INFO } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_INFO:
    return {
      ...state, email: action.payload,
    };
  default:
    return state;
  }
}
