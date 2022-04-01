export const SAVE_INFO = 'SAVE_INFO';
export const WALLET_INFO = 'WALLET_INFO';

export const saveInfo = (payload) => ({
  type: SAVE_INFO,
  payload,
});

export const wallerInfo = (payload) => ({
  type: WALLET_INFO,
  payload,
});
