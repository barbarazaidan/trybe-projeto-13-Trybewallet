import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExchangeRates } from '../redux/actions/addExpenses';
import { fetchCurrency } from '../redux/actions/addCurrencies';
import { newExpensesWallet } from '../redux/actions/editExpense';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: '',
    method: '',
    tag: '',
    description: '',
    exchangeRates: '',
  };

  async componentDidMount() {
    // preciso do dispatch para chamar a função.
    const { dispatch } = this.props;
    await dispatch(fetchCurrency());
  }

  // O componente didUpdate precisa ter um if para não atualizar de forma infinita, e uso ele para deixar o valor padrão select das moedas como sendo o primeiro item da lista de array

  componentDidUpdate() {
    this.geraEstados();
    this.editaADespesa();
  }

  geraEstados = () => {
    const { currencies } = this.props;
    const { currency } = this.state;
    if (currency === '') {
      this.setState({
        currency: currencies[0],
        // coloquei o method e a tag aqui, pois o lint reclamou quando setei no início do estado, já que tinha que repetir as strings também no saveInfo() e no saveInfoEdited()
        method: 'Dinheiro',
        tag: 'Alimentação',
      });
    }
  };

  editaADespesa = () => {
    const { editor, idToEdit, expenses } = this.props;
    // console.log(editor);
    const { id } = this.state;
    // console.log(id);
    if (editor && id !== idToEdit) {
      const despesaEmEdicao = expenses.find((expense) => expense.id === idToEdit);
      // console.log(despesaEmEdicao);
      // console.log('estou editando');
      const {
        value, currency, method, tag, description, exchangeRates,
      } = despesaEmEdicao;
      this.setState({
        id: despesaEmEdicao.id,
        value,
        currency,
        method,
        tag,
        description,
        exchangeRates,
      });
    }
  };

  handleChange = ({ target: { value, id } }) => {
    // console.log(value, id);
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
      currency: '',
      method: '',
      tag: '',
      description: '',
      exchangeRates: '',
      id: previousState.id + 1, // isto aqui vai ser o contador do id, funciona melhor do que é length (por conta do requisito de edição) e é mais prático
    }));
  };

  saveInfoEdited = () => {
    const { dispatch, expenses } = this.props;
    // console.log(expenses);
    const dispesaEditada = { ...this.state };
    // console.log(dispesaEditada);
    const NewExpenses = expenses.map((expense) => {
      if (dispesaEditada.id === expense.id) {
        return dispesaEditada;
      } return expense;
    });
    // console.log(NewExpenses);

    dispatch(newExpensesWallet(NewExpenses));
    this.setState({
      id: expenses.length,
      value: '',
      currency: '',
      method: '',
      tag: '',
      description: '',
      exchangeRates: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    // console.log(currencies);
    const { value, description, method, currency, tag } = this.state;
    // const { value, description, exchangeRates } = this.state;

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
              value={ currency }
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
              // com o value desta forma, ele muda o select na hora de editar as despesas
              value={ method }
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
              value={ tag }
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
          { editor ? (
            <button
              type="button"
              data-testid="btn-edit-form"
              onClick={ this.saveInfoEdited }
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="button"
              onClick={ this.saveInfo }
            >
              Adicionar despesa
            </button>
          )}
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (globalState) => ({
//   currencies: globalState.wallet.currencies,
//   expenses: globalState.wallet.expenses,
// });

const mapStateToProps = ({ wallet: { currencies, expenses, editor, idToEdit } }) => ({
  currencies,
  expenses,
  editor,
  idToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
