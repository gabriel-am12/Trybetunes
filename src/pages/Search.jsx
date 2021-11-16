import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, type, value, checked } }) {
    value = (type === 'checkbox') ? checked : value;
    this.setState({ [name]: value });
  }

  render() {
    const { name } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            value={ name }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ name.length < 2 }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
