import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  state = {
    isNewExpense: false,
  };

  componentDidMount() {
    const { expenses } = this.props;
    if (expenses.length !== 0) this.setState({ isNewExpense: true });
  }

  componentDidUpdate(previousProp) {
    const { expenses } = this.props;

    if (expenses.length > 0 && expenses.length !== previousProp.expenses.length) {
      this.setState({ isNewExpense: true });
    }
  }

  calValorConvertido = (valor, moeda) => {
    const valorConvertido = (Number(valor) * Number(moeda.ask)).toFixed(2);
    return valorConvertido;
  };

  geraLinhaTabela = () => {
    const { expenses } = this.props;
    // console.log(expenses);
    const linhas = expenses.map(({
      id, description, tag, method, value, currency, exchangeRates,
    }) => {
      const moedaCorreta = exchangeRates[currency];
      return (
        <tr key={ id }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{Number(value).toFixed(2)}</td>
          <td>{moedaCorreta.name}</td>
          <td>{Number(moedaCorreta.ask).toFixed(2)}</td>
          <td>{this.calValorConvertido(value, moedaCorreta)}</td>
          <td>Real</td>
        </tr>
      );
    });
    return linhas;
  };

  render() {
    const { isNewExpense } = this.state;
    return (
      <div className="walletTableDiv">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { isNewExpense && (this.geraLinhaTabela()) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({ expenses });

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    description: PropTypes.string,
    exchangerates: PropTypes.shape({}),
  })).isRequired,
};

export default connect(mapStateToProps)(Table);
