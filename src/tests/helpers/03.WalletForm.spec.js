import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import Wallet from '../../pages/Wallet';

describe('Testa o componente "WalletForm"', () => {
  it('Verifica os dados do estado global assim que o componente carrega', () => {
    const initialState = {
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };

    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState });

    const resultadoInicial = {
      currencies: [],
      expenses: [],
      editor: false,
      idToEdit: 0,
    };

    expect(store.getState().wallet).toEqual(resultadoInicial);
  });

  it('Verifica se o Fetch para listar as moedas é chamado logo depois que o componente carrega', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />);

    const resultadoComFetchCurrency = {
      currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
      expenses: [],
      editor: false,
      idToEdit: 0,
    };

    await waitFor(() => expect(store.getState().wallet)
      .toEqual(resultadoComFetchCurrency));
  });

  it('Verifica se os dados do formulário são salvos no componente global', async () => {
    // Não funcionou quando desenvolvi assim, sempre aparecia a mensagem "TestingLibraryElementError: Value "USD" not found in options"
    // const moedaEUR = await screen.findByRole('option', { name: 'EUR' });
    // userEvent.selectOptions(moedaEUR, ['EUR']);

    const { store } = renderWithRouterAndRedux(<Wallet />);

    const valor = screen.getByLabelText('Valor:');
    const moedas = screen.getByTestId('currency-input');
    const botaoAdicionar = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(valor, '90');
    await waitFor(() => userEvent.selectOptions(moedas, ['EUR'])); // precisa do waitFor para esperar o carregamento do Fetch no select. E precisei usar o select como um todo e não a option
    userEvent.click(botaoAdicionar);

    const resultadoDepoisDoFetch = {
      expenses: [
        {
          id: 0,
          value: '90',
          currency: 'EUR',
          method: 'Dinheiro',
          tag: 'Alimentação',
          description: '',
        },
      ],
    };

    // também precisa do waitFor por conta da chamada do Fetch dentro da função fetchExchangeRate que é disparada ao clicar no botão
    await waitFor(() => expect(store.getState().wallet)
      .toMatchObject(resultadoDepoisDoFetch));
  });

  it('Verifica se os dados do formulário são limpos depois de adicionar a despesa', async () => {
    const { debug } = renderWithRouterAndRedux(<Wallet />);

    const valor = screen.getByLabelText('Valor:');
    const moedas = screen.getByTestId('currency-input');
    const botaoAdicionar = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(valor, '90');
    await waitFor(() => userEvent.selectOptions(moedas, ['EUR']));
    userEvent.click(botaoAdicionar);

    await waitFor(() => {
      expect(valor.value).toBe('');
      expect(moedas.value).toBe('USD');
    });
    debug();
  });
});
