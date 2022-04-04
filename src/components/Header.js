import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { savedExpenses } = this.props;
    console.log(savedExpenses);
    return (
      <table>
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
        {
          savedExpenses.map(
            ({ description, tag, method, currency, value, exchangeRates }, i) => (
              <tr key={ `${tag}_${value}` }>
                <td key={ `${description}_${i}` }>{description}</td>
                <td key={ `${tag}_${i}` }>{tag}</td>
                <td key={ `${method}_${i}` }>{method}</td>
                <td key={ `${value}_${i}` }>{(+value).toFixed(2)}</td>
                {currency === 'USD' && <td key={ i }>Dólar Comercial</td>}
                {currency === 'EUR' && <td key={ i }>Euro</td>}
                { currency === !'EUR'
            && currency === !'USD'
            && <td key={ i }>{`${currency}/Real Brasileiro`}</td>}
                <td key={ `${exchangeRates[currency].ask}` }>
                  {(+exchangeRates[currency].ask).toFixed(2)}
                </td>
                <td key={ `${value * exchangeRates[currency].ask}` }>
                  {' '}
                  {(+value * +exchangeRates[currency].ask).toFixed(2)}
                  {' '}
                </td>
                <td key={ `${method}Real` }>Real</td>
              </tr>
            ),
          )
        }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  savedExpenses: state.wallet.expenses,
});

Header.propTypes = {
  savedExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
