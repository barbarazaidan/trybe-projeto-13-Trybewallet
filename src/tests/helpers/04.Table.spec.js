import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
// import mockData from './mockData';
import Wallet from '../../pages/Wallet';
import Table from '../../components/Table';

describe('Testa o componente "Table"', () => {
  const idCurrencyInput = 'currency-input';
  const btnName = 'Adicionar despesa';
  it('Verifica se o cabeçalho da tabela está correto', () => {
    renderWithRouterAndRedux(<Table />);

    const descricao = screen.getByRole('columnheader', { name: 'Descrição' });
    const tag = screen.getByRole('columnheader', { name: 'Tag' });
    const pagamento = screen.getByRole('columnheader', { name: 'Método de pagamento' });
    const valor = screen.getByRole('columnheader', { name: 'Valor' });
    const moeda = screen.getByRole('columnheader', { name: 'Moeda' });
    const cambio = screen.getByRole('columnheader', { name: 'Câmbio utilizado' });
    const valorConvertido = screen.getByRole('columnheader', { name: 'Valor convertido' });
    const moedaConversao = screen.getByRole('columnheader', { name: 'Moeda de conversão' });
    const editarExcluir = screen.getByRole('columnheader', { name: 'Editar/Excluir' });

    expect(descricao).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(pagamento).toBeInTheDocument();
    expect(valor).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(cambio).toBeInTheDocument();
    expect(valorConvertido).toBeInTheDocument();
    expect(moedaConversao).toBeInTheDocument();
    expect(editarExcluir).toBeInTheDocument();
  });

  it('Verifica se as informações preenchidas no formulário são salvas na tabela', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const valor = screen.getByLabelText('Valor:');
    const moedas = screen.getByTestId(idCurrencyInput);
    const descricao = screen.getByLabelText('Descrição:');
    const botaoAdicionar = screen.getByRole('button', { name: btnName });

    userEvent.type(valor, '90');
    await waitFor(() => userEvent.selectOptions(moedas, ['EUR']));
    userEvent.type(descricao, '90 euros com alimentação');
    userEvent.click(botaoAdicionar);

    const descricaoLinha = await screen.findByText('90 euros com alimentação'); // só o primeiro precisa do await e do findBy
    const valorLinha = screen.getByRole('cell', { name: '90.00' });
    const moedaLinha = screen.getByRole('cell', { name: 'Euro/Real Brasileiro' });

    expect(descricaoLinha).toBeInTheDocument();
    expect(valorLinha).toBeInTheDocument();
    expect(moedaLinha).toBeInTheDocument();
  });

  it('Verifica se o botão de Deletar apagar a despesa da tabela', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const valor = screen.getByLabelText('Valor:');
    // precisa ter o moedas para rodar corretamente o código
    const moedas = screen.getByTestId(idCurrencyInput);
    const descricao = screen.getByLabelText('Descrição:');
    const botaoAdicionar = screen.getByRole('button', { name: btnName });

    userEvent.type(valor, '90');
    // também precisa a chamada abaixo para rodar corretamente o código
    await waitFor(() => userEvent.selectOptions(moedas, ['USD']));
    userEvent.type(descricao, '90 dólares com alimentação');
    userEvent.click(botaoAdicionar);

    const descricaoLinha = await screen.findByText('90 dólares com alimentação');
    const valorLinha = screen.getByRole('cell', { name: '90.00' });
    const moedaLinha = screen.getByRole('cell', { name: 'Dólar Americano/Real Brasileiro' });
    const botaoExcluir = screen.getByText('Excluir');

    userEvent.click(botaoExcluir);

    expect(descricaoLinha).not.toBeInTheDocument();
    expect(valorLinha).not.toBeInTheDocument();
    expect(moedaLinha).not.toBeInTheDocument();
  });

  // it('Verifica se o botão de Editar modifica a despesa da tabela', async () => {
  // // teria como mockar o id para como se eu tivesse clicado no saveInfo?

  //   const initialState = {
  //     wallet: {
  //       currencies: Object.keys(mockData),
  //       expenses: [{
  //         id: 0,
  //         value: '90',
  //         currency: 'EUR',
  //         method: 'Dinheiro',
  //         tag: 'Alimentação',
  //         description: '90 EUR',
  //         exchangeRates: mockData,
  //       }],
  //       editor: false,
  //       idToEdit: 0,
  //     },
  //   };

  //   const { debug } = renderWithRouterAndRedux(<Wallet />, { initialState });

  //   const descricaoLinha = screen.getByText('90 EUR');
  //   const botaoEditar = screen.getByTestId('edit-btn');
  //   const inputDescricao = screen.getByTestId('description-input');

  //   expect(descricaoLinha).toBeInTheDocument();

  //   userEvent.click(botaoEditar);
  //   const btnAdicionarDespesa = screen.queryByRole('button', { name: 'Adicionar despesa' });

  //   expect(btnAdicionarDespesa).not.toBeInTheDocument();

  //   // usando o estado inicial, os inputs não atualizam no componente WalletForm, pois uma das validações usa o id atual diferente do id de edição. A questão é que aqui eu não cliquei no botão de adicionar, portanto não mudei os ids e aí não entra na validação, o que gera falha, já que as exchangeRates passam a ficar vazias.

  //   userEvent.type(inputDescricao, '90 euros com alimentação');
  //   const btnEditarDespesa = screen.getByTestId('btn-edit-form');
  //   userEvent.click(btnEditarDespesa);

  //   debug();
  // });

  it('Verifica se o botão de Editar modifica a despesa da tabela', async () => {
    const { debug } = renderWithRouterAndRedux(<Wallet />);

    const valor = screen.getByLabelText('Valor:');
    const moedas = screen.getByTestId(idCurrencyInput);
    const inputDescricao = screen.getByTestId('description-input');
    const botaoAdicionar = screen.getByRole('button', { name: btnName });

    userEvent.type(valor, '90');
    await waitFor(() => userEvent.selectOptions(moedas, ['EUR']));
    userEvent.type(inputDescricao, '90 EUR');
    userEvent.click(botaoAdicionar);

    const descricaoLinha = await screen.findByText('90 EUR');

    expect(descricaoLinha).toBeInTheDocument();

    const botaoEditarLinha = screen.getByTestId('edit-btn');
    userEvent.click(botaoEditarLinha);
    const btnEditarDespesa = screen.queryByTestId('btn-edit-form');

    userEvent.clear(inputDescricao);
    userEvent.type(inputDescricao, '90 euros gastos com alimentação');
    userEvent.click(btnEditarDespesa);

    const descricaoLinhaModicada = screen.getByText('90 euros gastos com alimentação');
    debug();

    expect(descricaoLinhaModicada).toBeInTheDocument();
  });
});
