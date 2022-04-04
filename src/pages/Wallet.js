import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currenciesThunk } from '../actions';
import Form from '../components/Form';
import Header from '../components/Header';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      moeda: 'BRL',
    };
  }

  componentDidMount() {
    this.renderCurrencies();
  }

  renderCurrencies = async () => {
    const { currencie } = this.props;
    this.setState({ loading: true });
    await currencie();
    this.setState({ loading: false });
  }

  render() {
    const { email, expenses } = this.props;
    const { moeda, loading } = this.state;
    return (
      <>
        { loading && <h4>Carregando...</h4>}
        <header data-testid="email-field">
          {`Olá, ${email}`}
          <p data-testid="total-field">
            { expenses.reduce((acc, elem) => {
              const { exchangeRates, currency, value } = elem;
              const exchange = exchangeRates[currency].ask;
              return (acc + (+value * +exchange));
            }, 0).toFixed(2)}
          </p>
          <p data-testid="header-currency-field">
            {`A moeda atual é ${moeda}`}
          </p>
        </header>
        <Form />
        <Header />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  currencie: () => dispatch(currenciesThunk()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  total: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
