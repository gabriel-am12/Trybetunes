import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      collectionName: '',
      musics: [],
      image: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
      .then((response) => {
        const { artistName, collectionName, artworkUrl100: image } = response[0];
        this.setState({
          artistName,
          collectionName,
          musics: response,
          image,
        });
      });
  }

  render() {
    const { artistName, collectionName, musics, image } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <div>
            <img src={ image } alt={ collectionName } />
            <h3 data-testid="album-name">{ collectionName }</h3>
            <p data-testid="artist-name">{ artistName }</p>
          </div>
          <MusicCard musics={ musics } />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.number,
}.isRequire;

export default Album;
