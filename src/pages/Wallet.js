import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gastos: 0,
      moeda: 'BRL',
    };
  }

  render() {
    const { email } = this.props;
    const { gastos, moeda } = this.state;
    return (
      <header data-testid="email-field">
        {`Olá, ${email}`}
        <p data-testid="total-field">
          {`O gasto é ${gastos}`}
        </p>
        <p data-testid="header-currency-field">
          {`A moeda atual é ${moeda}`}
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
