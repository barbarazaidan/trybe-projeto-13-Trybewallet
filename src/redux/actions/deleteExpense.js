export const DELETE_EXPENSE_WALLET = 'DELETE_EXPENSE_WALLET';

export const deletExpenseWallet = (id) => ({
  type: DELETE_EXPENSE_WALLET,
  payload: id,
});
