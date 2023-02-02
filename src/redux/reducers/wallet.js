// import {
//   ADD_CURRENCIES_WALLET, ADD_EDITOR_WALLET, ADD_EXPENSE_WALLET, ADD_ISTOEDIT_WALLET,
// } from '../actions';

import {
  ADD_CURRENCIES_WALLET,
} from '../actions';

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
      currencies: (action.payload).filter((moeda) => moeda !== 'USDT'),
    }; // excluo do array a string USDT
  default:
    return state;
  }
};

export default walletReducer;
