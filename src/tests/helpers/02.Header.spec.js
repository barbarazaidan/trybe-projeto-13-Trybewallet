import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import Header from '../../components/Header';
// import Wallet from '../../pages/Wallet';
// import mockData from './mockData';
// import { fetchExchangeRates } from '../../redux/actions/addExpenses';

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

  // it('Verifica se a informação das despesas totais é renderizada na tela', async () => {
  //   // fetchExchangeRates

  //   renderWithRouterAndRedux(<Wallet />);
  //   jest.mock('../../redux/actions/addExpenses');
  //   fetchExchangeRates.mockReturnValue({
  //     id: 0,
  //     value: '80',
  //     currency: 'EUR',
  //     method: 'Dinheiro',
  //     tag: 'Alimentacao',
  //     description: '',
  //     exchangeRates: mockData,
  //   });

  //   const valor = screen.getByLabelText('Valor:');
  //   const moedas = screen.getByTestId('currency-input');
  //   const botaoAdicionar = screen.getByRole('button', { name: 'Adicionar despesa' });
  //   const despesasTotaisRenderizada = screen.getByTestId('total-field');

  //   expect(despesasTotaisRenderizada).toHaveTextContent('0');

  //   userEvent.type(valor, '80');
  //   await waitFor(() => userEvent.selectOptions(moedas, ['EUR']));
  //   userEvent.click(botaoAdicionar);

  //   // expect(despesasTotaisRenderizada).toHaveTextContent('463.74');
  //   await waitFor(() => expect(despesasTotaisRenderizada)
  //     .toHaveTextContent('444,86'));
  // });
});
