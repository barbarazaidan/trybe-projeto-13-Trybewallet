export const EDITOR_WALLET = 'EDITOR_WALLET';
export const ID_TOEDIT_WALLET = 'ID_TOEDIT_WALLET';

export const editorWallet = (id) => ({
  type: EDITOR_WALLET,
  payload: id,
});
