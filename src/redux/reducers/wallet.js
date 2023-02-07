// import {
//   ADD_EDITOR_WALLET, ADD_ISTOEDIT_WALLET,
// } from '../actions';
import { ADD_CURRENCIES_WALLET } from '../actions/addCurrencies';
import { ADD_EXPENSE_WALLET } from '../actions/addExpenses';
import { DELETE_EXPENSE_WALLET } from '../actions/deleteExpense';
import { EDIT_EXPENSE_WALLET, NEW_EXPENSES_WALLET } from '../actions/editExpense';

const INNICIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0,
};

const walletReducer = (state = INNICIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES_WALLET:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((moeda) => moeda !== 'USDT'),
    };
    // action.payload é um objeto, mas quero pegar apenas as chaves e ter um array, então uso o método Object.key(), em seguida excluo do array a string USDT
  case ADD_EXPENSE_WALLET:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      // faço o spred no array antigo da chave expenses e acrescento o novo objeto vindo da action
    };
  case DELETE_EXPENSE_WALLET:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_EXPENSE_WALLET:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case NEW_EXPENSES_WALLET:
    return {
      ...state,
      editor: false,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
