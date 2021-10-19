import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      user: '',
      buttonDisabled: true,
      isLoading: false,
      logged: false,
    };
  }

  onChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const minLength = 3;

    this.setState({
      [name]: value,
    });

    if (value.length >= minLength) {
      this.setState({
        buttonDisabled: false,
      });
    }
  }

  onClick() {
    const { user } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      await createUser({ name: user });
      this.setState({
        isLoading: false,
        logged: true,
      });
    });
  }

  render() {
    const { user, buttonDisabled, isLoading, logged } = this.state;
    return (
      <div data-testid="page-login">
        <input
          type="text"
          name="user"
          id="login"
          data-testid="login-name-input"
          onChange={ this.onChange }
          value={ user }
        />
        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.onClick }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
        { isLoading === true && <Loading /> }
        { logged === true && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
