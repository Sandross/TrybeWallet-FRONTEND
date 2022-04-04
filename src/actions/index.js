import { currency, currencyAll } from '../services/Api';

export const SAVE_INFO = 'SAVE_INFO';
export const WALLET_INFO = 'WALLET_INFO';
export const PEOPLE_INFO = 'PEOPLE_INFO';
export const EXPENSE_INFO = 'EXPENSE_INFO';
export const WALLET_REQUEST = 'WALLET_REQUEST';
export const EXPENSE_REQUEST = 'EXPENSE_REQUEST';
export const WALLET_ERROR = 'WALLET_ERROR';
export const EXPENSE_ERROR = 'EXPENSE_ERROR';
export const REMOVE_INFO = 'REMOVE_INFO';

export const walletRequest = () => ({
  type: WALLET_REQUEST,
});

export const expenseRequest = () => ({
  type: EXPENSE_REQUEST,
});

export const peopleInfo = (expend, exchangeRates) => ({
  type: PEOPLE_INFO,
  payload: {
    expend,
    exchangeRates,
  },
});

export const saveInfo = (payload) => ({
  type: SAVE_INFO,
  payload,
});

export const walletInfo = (payload) => ({
  type: WALLET_INFO,
  payload,
});

export const expenseError = (error) => ({
  type: EXPENSE_ERROR,
  error,
});

export const expenseInfo = (payload) => ({
  type: EXPENSE_INFO,
  payload,
});

export const walletError = (error) => ({
  type: WALLET_ERROR,
  error,
});

export const removeInfo = (info) => ({
  type: REMOVE_INFO,
  payload: info,
});

export const currenciesThunk = () => async (dispatch) => {
  dispatch(walletRequest());
  try {
    const currencyFetch = await currency();
    dispatch(walletInfo(currencyFetch));
  } catch (error) {
    dispatch(walletError(error));
  }
};

export const expensesThunk = (info) => async (dispatch) => {
  dispatch(expenseRequest());
  try {
    const currencyFetch = await currencyAll();
    dispatch(peopleInfo(info, currencyFetch));
  } catch (error) {
    dispatch(expenseError(error));
  }
};
