import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();

    this.loadUser = this.loadUser.bind(this);

    this.state = {
      isLoading: false,
      description: '',
      email: '',
      image: '',
      name: '',
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    this.setState({
      isLoading: true,
    });
    getUser().then((response) => {
      const { email, description, image, name } = response;
      this.setState({
        description,
        email,
        image,
        name,
        isLoading: false,
      });
    });
  }

  render() {
    const { description, email, image, name, isLoading } = this.state;
    const defaultPic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading === true && <Loading /> }
        <main className="profile-container">
          <div>
            <p>{name}</p>
            <img
              data-testid="profile-image"
              src={ image || defaultPic }
              alt="Profile avatar"
              width="100px"
            />
            <p>
              Email:
              {' '}
              {email}
            </p>
            <p>
              Descrição:
              {' '}
              {description}
            </p>
          </div>
          <Link to="/profile/edit">Editar perfil</Link>
        </main>
      </div>
    );
  }
}

export default Profile;
