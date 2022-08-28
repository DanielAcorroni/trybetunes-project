import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();

    this.loadFavorites = this.loadFavorites.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      isLoading: false,
      favoriteSongs: [],
      favorite: true,
    };
  }

  componentDidMount() {
    this.loadFavorites();
  }

  onChange({ target }) {
    const { id } = target;
    console.log(typeof id);
    const { favoriteSongs } = this.state;
    const removeObj = favoriteSongs.filter((song) => {
      console.log(song.trackId);
      return `${song.trackId}` === id;
    });
    console.log(removeObj[0]);
    this.setState({
      isLoading: true,
    }, () => {
      removeSong(removeObj[0]).then(() => {
        const loaded = false;
        this.setState({
          isLoading: loaded,
        }, () => this.loadFavorites());
      });
    });
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
    const { isLoading, favoriteSongs, favorite } = this.state;
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
        <main className="favorite-songs-container">
          <h1>Músicas favoritas</h1>
          <div className="favorite-songs">
            {
              favoriteSongs.map((song) => (
                <div key={ song.trackId }>
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
                  <label htmlFor={ song.trackId }>
                    Favorita
                    <input
                      type="checkbox"
                      name="favorite"
                      id={ song.trackId }
                      onChange={ this.onChange }
                      checked={ favorite }
                    />
                  </label>
                </div>
              ))
            }
          </div>
        </main>
      </div>
    );
  }
}

export default Favorites;
