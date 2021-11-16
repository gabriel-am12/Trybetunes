import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disabledButton: true,
      loading: false,
      redirect: false,
    };
  }

  handleNameInput = ({ target }) => {
    this.setState({ name: target.value });
    const minCharacters = 3;
    if (target.value.length >= minCharacters) {
      return this.setState({ disabledButton: false });
    }
  }

  userAPI = async (userName) => {
    this.setState({ loading: true });
    await createUser(userName);
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const { name, disabledButton, loading, redirect } = this.state;
    if (loading) {
      return <Loading />;
    }
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            name="login-name"
            id="login-name"
            placeholder="Nome"
            data-testid="login-name-input"
            onChange={ this.handleNameInput }
          />
          <button
            type="button"
            name="login-submit"
            id="login-submit"
            data-testid="login-submit-button"
            disabled={ disabledButton }
            onClick={ () => this.userAPI({ name }) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
