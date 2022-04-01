import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import currenciesThunk from '../actions';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      moeda: 'BRL',
      gastos: 0,
    };
  }

  componentDidMount() {
    this.renderCurrencies();
  }

  renderCurrencies = async () => {
    const { currencie } = this.props;
    this.setState({ loading: true });
    await currencie(currenciesThunk());
    this.setState({ loading: false });
  }

  render() {
    const { email } = this.props;
    const { moeda, loading, gastos } = this.state;
    return (
      <>
        { loading && <h4>Carregando...</h4>}
        <header data-testid="email-field">
          {`Olá, ${email}`}
          <p data-testid="total-field">
            {`O gasto é x ${gastos}`}
          </p>
          <p data-testid="header-currency-field">
            {`A moeda atual é ${moeda}`}
          </p>
        </header>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  gastos: state.wallet.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  currencie: () => dispatch(currenciesThunk()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  total: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
