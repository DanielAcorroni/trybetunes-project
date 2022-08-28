import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.loadCheckbox = this.loadCheckbox.bind(this);

    this.state = {
      favorite: false,
    };
  }

  componentDidMount() {
    this.loadCheckbox();
  }

  onChange({ target }) {
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
    }, () => {
      if (value === true) {
        addSong(thisSong);
      } else if (value === false) {
        removeSong(thisSong);
      }
    });
  }

  loadCheckbox() {
    getFavoriteSongs().then((response) => {
      const favoriteSongs = response;
      const { trackName } = this.props;
      favoriteSongs.forEach((track) => {
        if (track.trackName === trackName) {
          this.setState({
            favorite: true,
          });
        }
      });
    });
  }

  render() {
    const { previewUrl, trackId, trackName } = this.props;
    const { favorite } = this.state;
    return (
      <div className="music-card-play">
        <h4>{trackName}</h4>
        <audio
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
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorite"
            id={ trackId }
            onChange={ this.onChange }
            checked={ favorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
