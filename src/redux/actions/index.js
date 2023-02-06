export const ADD_EDITOR_WALLET = 'ADD_EDITOR_WALLET';
export const ADD_ISTOEDIT_WALLET = 'ADD_ISTOEDIT_WALLET';

// criei uma ação para trabalhar com cada chave do meu estado inicial refente à wallet

export const addEditorWallet = (editor) => ({
  type: ADD_EDITOR_WALLET,
  payload: editor,
});

export const addIsToEditWallet = (idToEdit) => ({
  type: ADD_ISTOEDIT_WALLET,
  payload: idToEdit,
});
