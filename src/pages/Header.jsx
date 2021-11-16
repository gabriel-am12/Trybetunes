import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.recoverUser();
  }

  recoverUser = async () => {
    this.setState({ loading: true });
    const returnedObj = await getUser();
    this.setState({ name: returnedObj.name, loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return loading ? <Loading /> : (
      <header data-testid="header-component">
        <h3 data-testid="header-user-name">
          { name }
        </h3>
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
