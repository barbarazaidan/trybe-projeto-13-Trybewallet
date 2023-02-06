export const ADD_EMAIL_DADOS = 'ADD_EMAIL_DADOS';

export const addEmail = (email) => ({
  type: ADD_EMAIL_DADOS,
  payload: email,
});
