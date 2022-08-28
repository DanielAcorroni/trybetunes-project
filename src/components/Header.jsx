import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../assets/images/trybe-tunes-logo.png';
import '../assets/index.css';

class Header extends React.Component {
  constructor() {
    super();
    this.getUserName = this.getUserName.bind(this);
    this.state = {
      userName: '',
      userImage: '',
    };
  }

  componentDidMount() {
    const { getUserName } = this;
    getUserName();
  }

  getUserName() {
    getUser().then((response) => {
      this.setState({
        userName: response.name,
        userImage: response.image,
      });
    });
  }

  render() {
    const { userName, userImage } = this.state;
    const defaultPic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    return (
      <header data-testid="header-component">
        <div>
          <img src={ logo } alt="TrybeTunes logo" />
          <h1>TrybeTunes</h1>
        </div>
        <div>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </div>
        <div className="header-user">
          <img src={ userImage || defaultPic } alt="Foto do usuario" />
          <p data-testid="header-user-name">{userName || '...Carregando'}</p>
        </div>
      </header>
    );
  }
}

export default Header;
