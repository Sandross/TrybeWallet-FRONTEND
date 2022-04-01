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
    };
  }

  componentDidMount() {
    this.renderCurrencies();
  }

  renderCurrencies = async () => {
    const { currencie } = this.props;
    console.log(currencie);
    console.log('chamei rendercurrencies');
    this.setState({ loading: true });
    await currencie(currenciesThunk());
    this.setState({ loading: false });
  }

  render() {
    const { email, gastos } = this.props;
    console.log(gastos);
    const { moeda, loading } = this.state;
    return (
      <>
        { loading && <h4>Carregando...</h4>}
        <header data-testid="email-field">
          {`Olá, ${email}`}
          <p data-testid="total-field">
            {'O gasto é x '}
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
  gastos: state.wallet,
});
const mapDispatchToProps = (dispatch) => ({
  currencie: () => dispatch(currenciesThunk()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  gastos: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
