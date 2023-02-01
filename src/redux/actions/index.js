export const ADD_EMAIL_DADOS = 'ADD_EMAIL_DADOS';
export const ADD_WALLET_DADOS = 'ADD_MOEDAS_DADOS';

export const addEmail = (email) => ({
  type: ADD_EMAIL_DADOS,
  payload: email,
});

export const addWallet = (wallet) => ({
  type: ADD_WALLET_DADOS,
  payload: wallet,
});
