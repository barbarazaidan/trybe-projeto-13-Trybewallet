import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import Wallet from '../../pages/Wallet';
import Table from '../../components/Table';

describe('Testa o componente "Table"', () => {
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
    const moedas = screen.getByTestId('currency-input');
    const descricao = screen.getByLabelText('Descrição:');
    const botaoAdicionar = screen.getByRole('button', { name: 'Adicionar despesa' });

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

  //   it('Verifica se as informações da tabela correspondem às do estado global', async () => {
  //     const initialState = {
  //       expenses: [
  //         {
  //           id: 0,
  //           value: '90',
  //           currency: 'EUR',
  //           method: 'Dinheiro',
  //           tag: 'Alimentacao',
  //           description: '90 euros com alimentação',
  //         },
  //       ],
  //     };

  //     renderWithRouterAndRedux(<Table />, { initialState });

  //     const descricaoLinha = await (screen.findByText('90 euros com alimentação'));
  //     // const tagLinha = await waitFor( () => screen.getByRole('cell', { name: 'Tag' }));
  //     // const pagamentoLinha = screen.getByRole('cell', { name: 'Método de pagamento' });
  //     // const valorLinha = screen.getByRole('cell', { name: 'Valor' });
  //     // const moedaLinha = screen.getByRole('cell', { name: 'Moeda' });
  //     // const cambioLinha = screen.getByRole('cell', { name: 'Câmbio utilizado' });
  //     // const valorConvertidoLinha = screen.getByRole('cell', { name: 'Valor convertido' });
  //     // const moedaConversaoLinha = screen.getByRole('cell', { name: 'Moeda de conversão' });
  //     // const editarExcluirLinha = screen.getByRole('cell', { name: 'Editar/Excluir' });

  //     expect(descricaoLinha).toBeInTheDocument();
  //     // expect(tag).toBeInTheDocument();
  //     // expect(pagamento).toBeInTheDocument();
  //     // expect(valor).toBeInTheDocument();
  //     // expect(moeda).toBeInTheDocument();
  //     // expect(cambio).toBeInTheDocument();
  //     // expect(valorConvertido).toBeInTheDocument();
  //     // expect(moedaConversao).toBeInTheDocument();
  //     // expect(editarExcluir).toBeInTheDocument();
  //   });

  it('Verifica se o botão de Deletar apagar a despesa da tabela', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const valor = screen.getByLabelText('Valor:');
    // precisa ter o moedas para rodar corretamente o código
    const moedas = screen.getByTestId('currency-input');
    const descricao = screen.getByLabelText('Descrição:');
    const botaoAdicionar = screen.getByRole('button', { name: 'Adicionar despesa' });

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
});
