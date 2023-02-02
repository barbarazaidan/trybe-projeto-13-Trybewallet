import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    // preciso do dispatch para chamar a função.
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);

    return (
      <div>
        <form className="formulario">
          <label htmlFor="valorDespesa" className="labelInputSelect">
            Valor:
            <input
              name="valorDespesa"
              type="number"
              data-testid="value-input"
            />
          </label>

          <label htmlFor="selectCurrency" className="labelInputSelect">
            Moeda
            <select name="selectCurrency" data-testid="currency-input">
              {currencies.map((currency) => (
                <option key={ currency } value={ currency }>{ currency }</option>
              ))}
            </select>
          </label>

          <label htmlFor="selectMetodo" className="labelInputSelect">
            Método de pagamento
            <select name="selectMetodo" data-testid="method-input">
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="selectTag" className="labelInputSelect">
            Categoria
            <select name="selectTag" data-testid="tag-input">
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>

          <label htmlFor="descricaoDespesa" className="labelInputSelect">
            Descrição:
            <input
              name="descricaoDespesa"
              type="text"
              data-testid="description-input"
            />
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({ currencies: globalState.wallet.currencies });

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
