import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import Header from '../../components/Header';
import Wallet from '../../pages/Wallet';
import mockData from './mockData';
import { fetchExchangeRates } from '../../redux/actions/addExpenses';

describe('Testa o componente Header', () => {
  it('Verifica se o estado global guarda a chave email e a renderiza na tela', () => {
    const initialState = {
      user: {
        email: 'tryber@trybe.com',
      },
    };

    renderWithRouterAndRedux(<Header />, { initialState });

    const emailRenderizado = screen.getByTestId('email-field');
    expect(emailRenderizado).toHaveTextContent('tryber@trybe.com');
  });

  it('Verifica se o campo com o data-testid="header-currency-field" contém o texto BRL', () => {
    renderWithRouterAndRedux(<Header />);

    const moedaRenderizada = screen.getByTestId('header-currency-field');
    expect(moedaRenderizada).toHaveTextContent('BRL');
  });

  // it('Verifica se a informação das despesas totais é renderizada na tela', () => {
  // const initialState = {
  //   wallet: {
  //     currencies: [],
  //     expenses: [],
  //   },
  // };

  // const initialState = {
  //   wallet: {
  //     currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
  //     expenses: [
  //       {
  //         id: 0,
  //         value: '90',
  //         currency: 'USD',
  //         method: 'Dinheiro',
  //         tag: 'Alimentacao',
  //         description: '',
  //       },
  //       {
  //         id: 1,
  //         value: '100',
  //         currency: 'ARS',
  //         method: 'Dinheiro',
  //         tag: 'Alimentacao',
  //         description: '',
  //       },
  //     ],
  //   },
  // };

  // renderWithRouterAndRedux(<App />);
  // const email = screen.getByTestId('email-input');
  // const senha = screen.getByTestId('password-input');
  // const botao = screen.getByRole('button', { name: 'Entrar' });

  // userEvent.type(email, 'alguem@alguem.com');
  // userEvent.type(senha, '123456');
  // userEvent.click(botao);

  // const despesasTotaisRenderizada = screen.getByTestId('total-field');
  // const emailRenderizado = screen.getByTestId('email-field');

  // expect(despesasTotaisRenderizada).toHaveTextContent('0');
  // expect(emailRenderizado).toHaveTextContent('alguem@alguem.com');

  // const valorDespesa = screen.getByTestId('value-input');
  // const currencyDespesa = screen.getByTestId('currency-input');
  // const buttonAdicionar = screen.getByRole('button', { name: 'Adicionar despesa' });

  // userEvent.type(valorDespesa, '90');
  // userEvent.click(buttonAdicionar);
  // expect(despesasTotaisRenderizada).toHaveTextContent('463.74');
  // });

  it('Verifica se a informação das despesas totais é renderizada na tela', async () => {
    // fetchExchangeRates

    renderWithRouterAndRedux(<Wallet />);
    jest.mock('../../redux/actions/addExpenses');
    fetchExchangeRates.mockReturnValue({
      id: 0,
      value: '80',
      currency: 'EUR',
      method: 'Dinheiro',
      tag: 'Alimentacao',
      description: '',
      exchangeRates: mockData,
    });

    const valor = screen.getByLabelText('Valor:');
    const moedas = screen.getByTestId('currency-input');
    const botaoAdicionar = screen.getByRole('button', { name: 'Adicionar despesa' });
    const despesasTotaisRenderizada = screen.getByTestId('total-field');

    expect(despesasTotaisRenderizada).toHaveTextContent('0');

    userEvent.type(valor, '80');
    await waitFor(() => userEvent.selectOptions(moedas, ['EUR']));
    userEvent.click(botaoAdicionar);

    // expect(despesasTotaisRenderizada).toHaveTextContent('463.74');
    await waitFor(() => expect(despesasTotaisRenderizada)
      .toHaveTextContent('444,86'));
  });
});
