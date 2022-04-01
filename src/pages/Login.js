import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveInfo } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: '',
      inputPass: '',
      isDisabled: true,
    };
  }

   handleChange = ({ target: { name, value } }) => {
     this.setState({
       [name]: value,
     }, () => this.validateBtn());
   }

   validateBtn = () => {
     const { inputEmail, inputPass } = this.state;
     const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     const maxLenght = 6;
     if (inputEmail.match(emailValidator) && inputPass.length >= maxLenght) {
       this.setState({
         isDisabled: false,
       });
     } else {
       this.setState({
         isDisabled: true,
       });
     }
   }

   validateLogin= (e) => {
     e.preventDefault();
     const { email, history } = this.props;
     const { inputEmail } = this.state;
     email(inputEmail);
     history.push('/carteira');
   }

   render() {
     const { inputEmail, inputPass, isDisabled } = this.state;
     return (
       <div>
         <label htmlFor="inputEmail">
           <strong>Email:</strong>
           <input
             data-testid="email-input"
             name="inputEmail"
             type="text"
             value={ inputEmail }
             onChange={ this.handleChange }
           />
         </label>
         <label htmlFor="inputPass">
           <strong>Senha:</strong>
           <input
             data-testid="password-input"
             name="inputPass"
             id="inputPass"
             type="password"
             value={ inputPass }
             onChange={ this.handleChange }
           />
         </label>
         <button
           type="submit"
           disabled={ isDisabled }
           onClick={ (e) => this.validateLogin(e) }
         >
           {' '}
           Entrar
           {' '}

         </button>
       </div>
     );
   }
}

const mapDispatchToProps = (dispatch) => ({
  email: (state) => dispatch(saveInfo(state)),
});

Login.propTypes = {
  email: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
