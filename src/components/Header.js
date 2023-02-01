import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    console.log(email);
    return (
      <div className="headerDiv">
        <p data-testid="email-field">{ email }</p>
        <div className="headerDivField">
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (globalState) => {
//   console.log(globalState);
// };

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
});

// console.log(mapStateToProps); // o mapStateToProps deve retornar um objeto

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
