import React from 'react';
import Header from './Header';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      musics: [],
    };
  }

  componentDidMount() {
    this.recoverMusicsArray();
  }

  recoverMusicsArray = () => {
    this.setState({ loading: true }, async () => {
      const getFavMusicArray = await getFavoriteSongs();

      this.setState({
        loading: false,
        musics: getFavMusicArray,
      });
    });
  }

  handleChange = async (music) => {
    const { musics } = this.state;
    let musicArray = [...musics];

    const hasAnId = musicArray.some(({ trackId }) => trackId === music.trackId);
    this.setState({ loading: true });

    if (hasAnId) {
      await removeSong(music);
      musicArray = musicArray.filter(({ trackId }) => trackId !== music.trackId);
    }
    this.setState({ loading: false, musics: musicArray });
  }

  render() {
    const { loading, musics } = this.state;
    return (
      <div>
        <Header />
        {loading ? <Loading /> : (
          <div data-testid="page-favorites">
            {musics.map((music) => (
              <MusicCard
                key={ music.trackId }
                musicList={ music }
                isChecked={ musics.some(
                  ({ trackId }) => trackId === music.trackId,
                ) }
                handleChange={ () => this.handleChange(music) }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
