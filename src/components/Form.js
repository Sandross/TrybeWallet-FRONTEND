import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      method: ['Cartão de crédito', 'Dinheiro', 'Cartão de débito'],
      category: ['Alimentação', 'Lazer', 'Trabalho', 'Saúde', 'Transporte'],
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, method, category } = this.state;
    const { currency } = this.props;
    console.log(currency);
    return (
      <div>
        <label htmlFor="value">
          <strong>Valor:</strong>
          <input
            type="number"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="select">
          <strong>Moeda:</strong>
          <select id="select" name="select" data-testid="currency-input">
            { currency && currency.map((e, i) => (
              <option value={ e } key={ i }>{e}</option>))}
          </select>
        </label>
        <label htmlFor="select-method">
          <strong>Método:</strong>
          <select id="select-method" name="select-method" data-testid="method-input">
            { method.map((e, i) => (
              <option value={ e } key={ i }>{e}</option>))}
          </select>
        </label>
        <label htmlFor="category-method">
          <strong>Categoria:</strong>
          <select id="category-method" name="category-method" data-testid="tag-input">
            { category.map((e, i) => (
              <option value={ e } key={ i }>{e}</option>))}
          </select>
        </label>
        <label htmlFor="description">
          <strong>Descrição:</strong>
          <input
            data-testid="description-input"
            type="text"
            id="description"
            name="description"
          />
        </label>
        <button type="button"> Adicionar Despesa</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
});

Form.propTypes = {
  currency: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Form);
