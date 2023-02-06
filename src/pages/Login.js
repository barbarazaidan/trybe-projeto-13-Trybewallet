import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions/addEmail';

class Login extends React.Component {
  state = {
    isBtnDisable: true,
    email: '',
    senha: '',
  };

  inputChange = ({ target: { value, name } }) => {
    // console.log(name);
    this.setState(
      { [name]: value },
      () => this.validationInput(),
    );
  };

  validationInput = () => {
    const { email, senha } = this.state;
    // console.log(email);
    const validEmail = /\S+@+\w+\.+[c]+[o]+[m]/;
    const minCaracter = 6;
    // \S: qualquer caracter que não é espaço em branco; +: adiciona uma nova análise à expressão anterior; \@: o @; \w: qualquer caracter de a ate z, de 0 até 9 e também _; \.: o ponto; [c]+ : a letra "c" e assim por diante
    if (validEmail.test(email) && senha.length >= minCaracter) {
      this.setState({ isBtnDisable: false });
    } else {
      this.setState({ isBtnDisable: true });
    }
  };

  enterLogin = () => {
    const { dispatch, history } = this.props; // ambos vêm do connect
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isBtnDisable } = this.state;
    return (
      <div className="loginDiv">
        <h1>TrybeWallet</h1>
        <form className="loginForm">
          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
            data-testid="email-input"
            onChange={ this.inputChange }
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            name="senha"
            data-testid="password-input"
            onChange={ this.inputChange }
          />
          <button
            type="button"
            disabled={ isBtnDisable }
            onClick={ this.enterLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
