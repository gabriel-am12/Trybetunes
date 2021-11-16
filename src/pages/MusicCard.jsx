import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musics } = this.props;
    return (
      <ul>
        {musics.map(({ trackName, previewUrl }, index) => (
          (index === 0)
            ? null : (
              <li key={ index }>
                <span>{ trackName }</span>
                <audio src={ previewUrl } data-testid="audio-component" controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
              </li>
            )
        ))}
      </ul>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.object,
}.isRequire;

export default MusicCard;
