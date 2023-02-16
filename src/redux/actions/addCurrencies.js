export const ADD_CURRENCIES_WALLET = 'ADD_CURRENCIES_WALLET';

export const addCurrenciesWallet = (currencies) => ({ // o currencies vem do retorno do data do fetch
  type: ADD_CURRENCIES_WALLET,
  payload: currencies,
});

// criei a ação de fetch para gerar as moedas que vai ser disparada no componente WalletForm dentro do didMount

export function fetchCurrency() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all') // essa primeira parte chama o fetch
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(addCurrenciesWallet(data));
      }); // depois que eu tenho o data, eu disparo a action que é responsável por atualizar o estado currencies e aí chega o trabalho do reducer
  };
}
