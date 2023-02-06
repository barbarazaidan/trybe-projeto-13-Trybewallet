export const ADD_EXPENSE_WALLET = 'ADD_EXPENSE_WALLET';

export const addExpenseWallet = (expense) => ({
  type: ADD_EXPENSE_WALLET,
  payload: expense, // matenho o expenses como o objeto que ele é
});

export function fetchExchangeRates(estadoComponente) {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        const paraEstadoGlobal = {
          ...estadoComponente,
          exchangeRates: data,
        };
        dispatch(addExpenseWallet(paraEstadoGlobal));
      });
  };
}
