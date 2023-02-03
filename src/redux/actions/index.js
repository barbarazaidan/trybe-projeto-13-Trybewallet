export const ADD_EMAIL_DADOS = 'ADD_EMAIL_DADOS';
export const ADD_EXCHANGE_WALLET = 'ADD_EXCHANGE_WALLET';
export const ADD_EDITOR_WALLET = 'ADD_EDITOR_WALLET';
export const ADD_ISTOEDIT_WALLET = 'ADD_ISTOEDIT_WALLET';

export const addEmail = (email) => ({
  type: ADD_EMAIL_DADOS,
  payload: email,
});

// criei uma ação para trabalhar com cada chave do meu estado inicial refente à wallet

export const addEditorWallet = (editor) => ({
  type: ADD_EDITOR_WALLET,
  payload: editor,
});

export const addIsToEditWallet = (idToEdit) => ({
  type: ADD_ISTOEDIT_WALLET,
  payload: idToEdit,
});
