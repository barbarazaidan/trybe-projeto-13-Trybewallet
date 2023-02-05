import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import Login from '../../pages/Login';
import App from '../../App';

describe('Testa os elementos do componente "Login"', () => {
  let email;
  let senha;
  let botao;

  beforeEach(() => {
    renderWithRouterAndRedux(<Login />);
    email = screen.getByTestId('email-input');
    senha = screen.getByTestId('password-input');
    botao = screen.getByRole('button', { name: 'Entrar' });
  });

  it('Verifica se o botao e os inputs de email e senha estão na tela', () => {
    // render(<Login />);
    // se uso só o render(), o teste falha, pois o Login pssou o connect() e aí o teste não consegue identificar o store

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(botao).toBeInTheDocument();
  });

  it('Verifica se a validação dos inputs está funcionando e se o botao começa desabilitado', () => {
    expect(botao).toBeDisabled();

    userEvent.type(email, 'tryber@trybe.com');
    userEvent.type(senha, '123456');

    expect(botao).not.toBeDisabled();

    // se eu coloco só assim, ele não apaga o caracter, ele só acrescenta os textos abaixo aos que coloquei nas linhas 39 e 40
    // userEvent.type(email, 'alguem@alguem.co');
    // userEvent.type(senha, '12345');
    // expect(senha.value).toBe('12345612345');

    userEvent.clear(senha);
    userEvent.type(senha, '12345');

    expect(botao).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(senha);
    userEvent.type(email, 'tryber@trybe.c');
    userEvent.type(senha, '123456');

    expect(botao).toBeDisabled();
  });
});

describe('Testa as rotas e estados do componente "Login"', () => {
  const testIdEmail = 'email-input';
  const testIdSenha = 'password-input';

  it('Verifica se ao clicar no botao Enviar, o usuário vai para a página da Carteira', () => {
    // se eu usar o componente Login não consigo fazer o redirecionamento da rota, por o teste não consegue ler as demais páginas
    // const { history } = renderWithRouterAndRedux(<Login />);

    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(testIdEmail);
    const senha = screen.getByTestId(testIdSenha);
    const botao = screen.getByRole('button', { name: 'Entrar' });
    // se eu desestruturo aqui, o teste não ler o valor atualizado depois do click do botão
    // const { location: { pathname } } = history;
    const rotaIncial = history.location.pathname;

    expect(rotaIncial).toBe('/');

    userEvent.type(email, 'usuario@trybe.com');
    userEvent.type(senha, '123456');
    userEvent.click(botao);
    const rotaDepoisDoClick = history.location.pathname;

    expect(rotaDepoisDoClick).toBe('/carteira');
  });

  it('Verifica se a chave email do estado global começa vazia e atualiza com o email digitado', () => {
    // se eu não usar App não consigo ler o novo estado da store
    const { store } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(testIdEmail);
    const senha = screen.getByTestId(testIdSenha);
    const botao = screen.getByRole('button', { name: 'Entrar' });

    expect(store.getState().user.email).toBe('');

    userEvent.type(email, 'alguem@alguem.com');
    userEvent.type(senha, '123456');
    userEvent.click(botao);

    expect(store.getState().user.email).toBe('alguem@alguem.com');
  });
});
