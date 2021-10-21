import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.loadCheckbox = this.loadCheckbox.bind(this);

    this.state = {
      isLoading: false,
      favorite: false,
    };
  }

  componentDidMount() {
    this.loadCheckbox();
  }

  onChange({ target }) {
    // consertar remove song
    const { name } = target;
    const value = target.checked;
    const { previewUrl, trackId, trackName } = this.props;
    this.setState({
      [name]: value,
    });
    const thisSong = {
      trackId,
      trackName,
      previewUrl,
    };
    this.setState({
      isLoading: true,
    }, () => {
      if (value === true) {
        addSong(thisSong).then(() => {
          this.setState({
            isLoading: false,
          });
        });
      } else if (value === false) {
        removeSong(thisSong).then(() => {
          const loaded = false;
          this.setState({
            isLoading: loaded,
          });
        });
      }
    });
  }

  loadCheckbox() {
    this.setState({
      isLoading: true,
    });
    getFavoriteSongs().then((response) => {
      this.setState({
        isLoading: false,
      });
      const favoriteSongs = response;
      const { trackName } = this.props;
      favoriteSongs.forEach((track) => {
        if (track.trackName === trackName) {
          console.log(trackName);
          this.setState({
            favorite: true,
          });
        }
      });
    });
  }

  render() {
    const { previewUrl, trackId, trackName } = this.props;
    const { favorite, isLoading } = this.state;
    return (
      <>
        <h4>{trackName}</h4>
        <audio
          key={ trackId }
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorite"
            id="favorite"
            onChange={ this.onChange }
            checked={ favorite }
          />
        </label>
        {isLoading === true && <Loading />}
      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
