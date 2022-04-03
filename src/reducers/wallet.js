import { WALLET_INFO, PEOPLE_INFO } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case WALLET_INFO:
    return {
      ...state, currencies: payload,
    };
  case PEOPLE_INFO: {
    const id = state.expenses.length;
    return {
      ...state,
      expenses: [...state.expenses, {
        ...payload.expend,
        // cria uma chave, logo nao preciso adicionar no estado inicial.
        exchangeRates: { ...payload.exchangeRates },
        id }],
    }; }
  default:
    return state;
  }
}
