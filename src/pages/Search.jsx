import React from 'react';
import Cards from '../components/Cards';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      artist: '',
      prevSearch: '',
      buttonDisabled: true,
      isLoading: false,
      albunsInterface: [],
      loaded: false,
    };
  }

  onChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const minLength = 2;

    this.setState({
      [name]: value,
    });

    if (value.length >= minLength) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  onClick() {
    const { artist } = this.state;
    this.setState({
      isLoading: true,
    });
    searchAlbumsAPI(artist).then((response) => {
      this.setState({
        isLoading: false,
        albunsInterface: response,
        prevSearch: artist,
        artist: '',
        loaded: true,
      });
    });
  }

  render() {
    const {
      artist,
      buttonDisabled,
      isLoading,
      albunsInterface,
      loaded,
      prevSearch } = this.state;
    const resultText = `Resultado de álbuns de: ${prevSearch}`;
    if (isLoading === true) {
      return (
        <>
          <Header />
          <Loading />
        </>
      );
    }
    return (
      <div data-testid="page-search">
        <Header />
        <input
          name="artist"
          data-testid="search-artist-input"
          type="text"
          value={ artist }
          onChange={ this.onChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.onClick }
        >
          Procurar
        </button>
        {loaded === true && <p>{resultText}</p>}
        {
          albunsInterface.length > 0 ? albunsInterface.map((singAlbum) => (<Cards
            key={ singAlbum.collectionId }
            album={ singAlbum }
          />)) : <p>Nenhum álbum foi encontrado</p>
        }
      </div>
    );
  }
}

export default Search;
