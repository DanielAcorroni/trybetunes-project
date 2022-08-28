import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../assets/index.css';

class Cards extends React.Component {
  render() {
    const { album } = this.props;
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } = album;
    const path = `/album/${collectionId}`;

    return (
      <Link
        to={ path }
        data-testid={ `link-to-album-${collectionId}` }
        className="music-card"
      >
        <div className="music-cards-div">
          <img src={ artworkUrl100 } alt="Imagem do álbum" />
          <p>{collectionName}</p>
          <p>{artistName}</p>
        </div>
      </Link>
    );
  }
}

Cards.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cards;
