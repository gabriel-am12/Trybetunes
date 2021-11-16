import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      searchArtist: '',
      loading: false,
      albums: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleChange({ target: { name, type, value, checked } }) {
    value = (type === 'checkbox') ? checked : value;
    this.setState({ [name]: value });
  }

  handleButton() {
    this.setState({ loading: true }, async () => {
      const { name } = this.state;
      const albums = await searchAlbumsAPI(name);
      this.setState({
        loading: false,
        name: '',
        searchArtist: name,
        albums,
      });
    });
  }

  render() {
    const { name, searchArtist, loading, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
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
              onClick={ this.handleButton }
            >
              Pesquisar
            </button>
          </div>
        )}
        {searchArtist && <h3>{`Resultado de álbuns de: ${searchArtist}`}</h3>}
        {albums.length === 0
          ? <h3>Nenhum álbum foi encontrado</h3>
          : albums.map(({ collectionId, collectionName }) => (
            <div key={ collectionId }>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                <h3>{ collectionName }</h3>
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

export default Search;
