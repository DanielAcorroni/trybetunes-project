import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);

    this.state = {
      artist: '',
      buttonDisabled: true,
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

  render() {
    const { artist, buttonDisabled } = this.state;
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
        >
          Procurar
        </button>
      </div>
    );
  }
}

export default Search;
