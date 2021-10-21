import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();

    this.loadFavorites = this.loadFavorites.bind(this);

    this.state = {
      isLoading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.setState({
      isLoading: true,
    });
    getFavoriteSongs().then((response) => {
      this.setState({
        isLoading: false,
        favoriteSongs: response,
      });
    });
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    if (isLoading === true) {
      return (
        <>
          <Header />
          <Loading />
        </>
      );
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          favoriteSongs.map((song) => (
            <>
              <h4>{song.trackName}</h4>
              <audio
                key={ song.trackId }
                data-testid="audio-component"
                src={ song.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </>
          ))
        }
      </div>
    );
  }
}

export default Favorites;
