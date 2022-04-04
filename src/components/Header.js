import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeInfo } from '../actions';

class Header extends Component {
   removeInfo = (id) => {
     console.log(id);
     const { removeInfos } = this.props;
     removeInfos(id);
   };

   render() {
     const { savedExpenses } = this.props;
     console.log(savedExpenses);
     return (
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
           {
             savedExpenses.map(
               ({ description, tag, method, currency, value, exchangeRates, id }, i) => (
                 <tr key={ id }>
                   <td>{description}</td>
                   <td>{tag}</td>
                   <td>{method}</td>
                   <td>{(+value).toFixed(2)}</td>
                   {currency === 'USD' && <td key={ i }>Dólar Comercial</td>}
                   {currency === 'EUR' && <td key={ i }>Euro</td>}
                   { currency === !'EUR'
            && currency === !'USD'
            && <td>{`${currency}/Real Brasileiro`}</td>}
                   <td>
                     {(+exchangeRates[currency].ask).toFixed(2)}
                   </td>
                   <td>
                     {' '}
                     {(+value * +exchangeRates[currency].ask).toFixed(2)}
                     {' '}
                   </td>
                   <td>Real</td>
                   <td>
                     <button
                       type="button"
                       onClick={ () => this.removeInfo(id) }
                       data-testid="delete-btn"
                     >
                       Excluir
                     </button>
                   </td>
                 </tr>
               ),
             )
           }
         </tbody>
       </table>
     );
   }
}

const mapStateToProps = (state) => ({
  savedExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeInfos: (info) => dispatch(removeInfo(info)),
});

Header.propTypes = {
  savedExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeInfos: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
