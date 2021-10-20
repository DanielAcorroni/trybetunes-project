import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.changeLoading = this.changeLoading.bind(this);
    this.getUserName = this.getUserName.bind(this);
    this.state = {
      isLoading: false,
      userName: '',
    };
  }

  componentDidMount() {
    const { getUserName } = this;
    getUserName();
  }

  getUserName() {
    this.changeLoading();
    getUser().then((response) => {
      this.changeLoading();
      this.setState({
        userName: response.name,
      });
    });
  }

  changeLoading() {
    const { isLoading } = this.state;
    if (isLoading === true) {
      this.setState({
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: true,
      });
    }
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        <p data-testid="header-user-name">{userName}</p>
        {isLoading === true && <Loading />}
      </header>
    );
  }
}

export default Header;
