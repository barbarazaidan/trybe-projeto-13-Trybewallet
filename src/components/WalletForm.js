import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExchangeRates } from '../redux/actions/addExpenses';
import { fetchCurrency } from '../redux/actions/addCurrencies';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: '',
    method: 'Dinheiro',
    tag: 'Alimentacao',
    description: '',
    // exchangeRates: '', // => deixei para criar este estado lá na função do fetchExchangeRates
  };

  async componentDidMount() {
    // preciso do dispatch para chamar a função.
    const { dispatch } = this.props;
    await dispatch(fetchCurrency());
  }

  // O componente didUpdate precisa ter um if para não atualizar de forma infinita, e uso ele para deixar o valor padrão select das moedas como sendo o primeiro item da lista de array

  componentDidUpdate() {
    const { currencies } = this.props;
    const { currency } = this.state;
    if (currency === '') {
      this.setState({ currency: currencies[0] });
    }
  }

  handleChange = ({ target: { value, id } }) => {
    // console.log(value, name);
    this.setState({ [id]: value });
  };

  saveInfo = async () => {
    // const { dispatch, expenses } = this.props;
    // console.log(expenses);
    // o await não funciona aqui porque o setState não é uma promise
    // await this.setState({ id: expenses.length }); // o length vai dar problema na hora de desenvolver o requisito 8
    // await dispatch(addExpenseWallet(this.state));
    // this.setState({ value: '', description: '' });

    const { dispatch } = this.props;
    await dispatch(fetchExchangeRates(this.state));
    this.setState((previousState) => ({
      value: '',
      description: '',
      id: previousState.id + 1, // isto aqui vai ser o contador do id, funciona melhor do que é length e é mais prático
    }));
  };

  render() {
    const { currencies } = this.props;
    // console.log(currencies);
    const { value, description } = this.state;

    return (
      <div>
        <form className="formulario">
          <label htmlFor="value" className="labelInputSelect">
            Valor:
            <input
              // name="value" // o correto é fazer a associação da label com o input usando id, pelo menos o teste do RTL reclama quando uso o name
              id="value"
              type="text"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency" className="labelInputSelect">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currencies.map((moeda) => (
                <option name="moedas" key={ moeda } value={ moeda }>{ moeda }</option>
              ))}
            </select>
          </label>

          <label htmlFor="method" className="labelInputSelect">
            Método de pagamento:
            <select
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag" className="labelInputSelect">
            Categoria
            <select
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="description" className="labelInputSelect">
            Descrição:
            <input
              id="description"
              type="text"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.saveInfo }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (globalState) => ({
//   currencies: globalState.wallet.currencies,
//   expenses: globalState.wallet.expenses,
// });

const mapStateToProps = ({ wallet: { currencies, expenses } }) => ({
  currencies,
  expenses,
});

// isto aqui era se eu estivesse usando o length, porque precisaria do expense
// WalletForm.propTypes = {
//   currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
//   expenses: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     value: PropTypes.string,
//     currency: PropTypes.string,
//     method: PropTypes.string,
//     tag: PropTypes.string,
//     description: PropTypes.string,
//     exchangeRates: PropTypes.string,
//   })).isRequired,
//   dispatch: PropTypes.func.isRequired,
// };

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
