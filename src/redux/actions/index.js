export const ADD_EMAIL_DADOS = 'ADD_EMAIL_DADOS';
export const ADD_CURRENCIES_WALLET = 'ADD_CURRENCIES_WALLET';
export const ADD_EXPENSE_WALLET = 'ADD_EXPENSE_WALLET';
export const ADD_EDITOR_WALLET = 'ADD_EDITOR_WALLET';
export const ADD_ISTOEDIT_WALLET = 'ADD_ISTOEDIT_WALLET';

export const addEmail = (email) => ({
  type: ADD_EMAIL_DADOS,
  payload: email,
});

// criei uma ação para trabalhar com cada chave do meu estado inicial refente à wallet

export const addCurrenciesWallet = (currencies) => ({ // o currencies vem do retorno do data do fetch
  type: ADD_CURRENCIES_WALLET,
  payload: Object.keys(currencies), // currencies é um objeto, mas quero pegar apenas as chaves e ter um array, então uso o método Object.key()
});

export const addExpenseWallet = (expenses) => ({
  type: ADD_EXPENSE_WALLET,
  payload: expenses,
});

export const addEditorWallet = (editor) => ({
  type: ADD_EDITOR_WALLET,
  payload: editor,
});

export const addIsToEditWallet = (idToEdit) => ({
  type: ADD_ISTOEDIT_WALLET,
  payload: idToEdit,
});

// criei a ação de fetch para gerar as moedas que vai ser disparada no componente WalletForm dentro do didMount

export function fetchCurrency() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all') // essa primeira parte chama o fetch
      .then((response) => response.json())
      .then((data) => dispatch(addCurrenciesWallet(data))); // depois que eu tenho o data, eu disparo a action que é responsável por atualizar o estado currencies e aí chega o trabalho do reducer
  };
}
