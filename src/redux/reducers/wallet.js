// import {
//   ADD_EDITOR_WALLET, ADD_ISTOEDIT_WALLET,
// } from '../actions';

import { ADD_CURRENCIES_WALLET } from '../actions/addCurrencies';
import { ADD_EXPENSE_WALLET } from '../actions/addExpenses';

const INNICIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
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
  default:
    return state;
  }
};

export default walletReducer;
