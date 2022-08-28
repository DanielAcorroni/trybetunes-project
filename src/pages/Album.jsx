import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.loadMusics = this.loadMusics.bind(this);

    this.state = {
      musicsAlbum: [],
    };
  }

  componentDidMount() {
    this.loadMusics();
  }

  loadMusics() {
    const { match } = this.props;
    const { id } = match.params;
    getMusics(id).then((response) => {
      this.setState({
        musicsAlbum: response,
      });
    });
  }

  render() {
    const { musicsAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="album-close-look">
          {
            musicsAlbum.map((music) => {
              if (music.previewUrl) {
                return (
                  <MusicCard
                    key={ music.trackId }
                    trackId={ music.trackId }
                    previewUrl={ music.previewUrl }
                    trackName={ music.trackName }
                  />
                );
              }
              return (
                <div key={ music.collectionName }>
                  <img src={ music.artworkUrl100 } alt={ music.collectionName } />
                  <p data-testid="artist-name">{music.artistName}</p>
                  <p data-testid="album-name">{music.collectionName}</p>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
