import { WALLET_INFO } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case WALLET_INFO:
    return {
      ...state,
      wallet: {
        ...state.wallet,
        ...action.payload,
      },
    };
  default:
    return state;
  }
}
