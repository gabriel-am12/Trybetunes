import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicList, handleChange, isChecked } = this.props;
    const { trackName, previewUrl, trackId } = musicList;
    return (
      <section>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="fav-checkbox">
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id="fav-checkbox"
            onChange={ handleChange }
            checked={ isChecked }
          />
          Favorita
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  musicList: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default MusicCard;
