import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    despesaTotal: 0,
  };

  // aqui o DidUpdate é chamado a cada vez que as props chamadas do estado global atualizam, então é o lugar certo para fazer a avaliação atualização dos valores

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    // analiso se a qnt de despesas do estado atual é diferente da qnt anterior
    if (expenses.length !== prevProps.expenses.length) {
      // crio um novo array cujos objetos contêm apenas as chaves value e cuja a chave exchangeRates possui somente o objeto referente à moeda da despesa
      const exchangeRatesNValue = expenses.map((expense) => {
        const { value, exchangeRates, currency } = expense;
        return ({
          value,
          exchangeRates: exchangeRates[currency],
        });
      });
      // chamo a função que vai calcular o total das despesas
      this.calculaDespesas(exchangeRatesNValue);
    }
  }

  calculaDespesas = (exchangeRatesNValue) => {
    const totalValue = exchangeRatesNValue.reduce((acumulador, valorCorrente) => {
      const { value, exchangeRates } = valorCorrente;
      const moedaConvertida = Number(value) * Number(exchangeRates.ask);
      return moedaConvertida + acumulador;
    }, 0);
    this.setState({ despesaTotal: totalValue.toFixed(2) });
  };

  render() {
    const { email } = this.props;
    const { despesaTotal } = this.state;

    return (
      <div className="headerDiv">
        <p data-testid="email-field">{`Email: ${email}` }</p>
        <div className="headerDivField">
          { /* colocar depois a string Despesa total: */ }
          <p data-testid="total-field">{`${despesaTotal}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    exchangeRates: PropTypes.shape({}),
  })).isRequired,
};

// const mapStateToProps = (globalState) => {
//   console.log(globalState);
// };

// const mapStateToProps = (globalState) => ({
//   email: globalState.user.email,
// });

// console.log(mapStateToProps); // o mapStateToProps deve retornar um objeto

export default connect(mapStateToProps)(Header);
