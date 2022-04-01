import { WALLET_INFO } from '../actions';

const INITIAL_STATE = {
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
        currencies: [action.payload],
        expenses: [],
      },
    };
  default:
    return state;
  }
}
