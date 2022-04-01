import currency from '../services/Api';

export const SAVE_INFO = 'SAVE_INFO';
export const WALLET_INFO = 'WALLET_INFO';

export const walletRequest = () => ({
  type: WALLET_INFO,
});

export const saveInfo = (payload) => ({
  type: SAVE_INFO,
  payload,
});

export const walletInfo = (payload) => ({
  type: WALLET_INFO,
  payload,
});

export const walletError = (error) => ({
  type: WALLET_INFO,
  error,
});

const currenciesThunk = () => async (dispatch) => {
  dispatch(walletRequest());
  try {
    const currencyFetch = await currency();
    dispatch(walletInfo(currencyFetch));
  } catch (error) {
    dispatch(walletError(error));
  }
};

export default currenciesThunk;
