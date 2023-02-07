export const EDIT_EXPENSE_WALLET = 'EDIT_EXPENSE_WALLET';
export const IS_EDITING_WALLET = 'IS_EDITING_WALLET';
export const NEW_EXPENSES_WALLET = 'NEW_EXPENSES_WALLET';

export const editExpenseWallet = (id) => ({
  type: EDIT_EXPENSE_WALLET,
  payload: id,
});

export const newExpensesWallet = (newExpenses) => ({
  type: NEW_EXPENSES_WALLET,
  payload: newExpenses,
});
