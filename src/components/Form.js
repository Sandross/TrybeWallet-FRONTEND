import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expensesThunk } from '../actions';

const alimentacao = 'Alimentação';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
      description: '',
      value: 0,
      methods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      categorys: ['Alimentação', 'Lazer', 'Trabalho', 'Saúde', 'Transporte'],
      isDisabled: true,
      loading: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validateBtn());
  }

  validateBtn = () => {
    const { description, value } = this.state;
    if (description && value >= 1) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  saveInfo = async () => {
    const { categorys, methods, isDisabled, loading, currenctCash, ...rest } = this.state;
    const { savePeople } = this.props;
    this.setState({ loading: true });
    await savePeople(rest);
    this.setState({ loading: false });
    this.setState({
      currency: 'USD',
      method: 'Dinheiro',
      tag: `${alimentacao}`,
      description: '',
      value: 0,
    });
  }

  render() {
    const { value, method, categorys,
      currency, methods, tag, description, isDisabled } = this.state;
    const { currencys } = this.props;
    return (
      <div>
        <label htmlFor="val">
          <strong>Valor:</strong>
          <input
            type="number"
            id="val"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="select">
          <strong>Moeda:</strong>
          <select
            id="select"
            value={ currency }
            name="currency"
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            { currencys && currencys.map((e, i) => (
              <option value={ e } key={ i }>{e}</option>))}
          </select>
        </label>
        <label htmlFor="select-method">
          <strong>Método:</strong>
          <select
            id="select-method"
            value={ method }
            name="method"
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            { methods.map((e) => (
              <option value={ e } key={ e }>{e}</option>))}
          </select>
        </label>
        <label htmlFor="category-method">
          <strong>Categoria:</strong>
          <select
            id="category-method"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            { categorys.map((e, i) => (
              <option value={ e } key={ i }>{e}</option>))}
          </select>
        </label>
        <label htmlFor="description-inpuy">
          <strong>Descrição:</strong>
          <input
            data-testid="description-input"
            value={ description }
            type="text"
            onChange={ this.handleChange }
            id="description-input"
            name="description"
          />
        </label>
        <button
          disabled={ isDisabled }
          onClick={ () => this.saveInfo() }
          type="button"
        >
          {' '}
          Adicionar Despesa

        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencys: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  savePeople: (info) => dispatch(expensesThunk(info)),
});

Form.propTypes = {
  currency: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
