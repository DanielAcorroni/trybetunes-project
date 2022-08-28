import React from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.loadUser = this.loadUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      isLoading: false,
      buttonDisabled: true,
      saved: false,
      description: '',
      email: '',
      image: '',
      name: '',
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  onChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.setState({
      buttonDisabled: this.buttonHandler(),
    }));
  }

  onClick() {
    const { description, email, image, name } = this.state;
    const updateUserObj = {
      name,
      email,
      image,
      description,
    };
    this.setState({
      isLoading: true,
    });
    updateUser(updateUserObj).then(() => {
      this.setState({
        isLoading: false,
        saved: true,
      });
    });
  }

  buttonHandler() {
    const { description, email, image, name } = this.state;
    const two = 2;
    if (description.length < two) return true;
    if (email.length < two) return true;
    if (image.length < two) return true;
    if (name.length < two) return true;
    return false;
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
        buttonDisabled: this.buttonHandler(),
      });
    });
  }

  render() {
    const {
      description,
      email,
      image,
      name,
      isLoading,
      buttonDisabled,
      saved } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading === true && <Loading /> }
        <form className="edit-profile-form">
          <label htmlFor="name-input">
            Name:
            <input
              type="text"
              name="name"
              id="name-input"
              onChange={ this.onChange }
              value={ name }
              data-testid="edit-input-name"
            />
          </label>
          <label htmlFor="image-input">
            Profile picture:
            <input
              type="text"
              name="image"
              id="image-input"
              onChange={ this.onChange }
              value={ image }
              data-testid="edit-input-image"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              id="email-input"
              onChange={ this.onChange }
              value={ email }
              data-testid="edit-input-email"
            />
          </label>
          <label htmlFor="description-input">
            Description:
            <textarea
              name="description"
              id="description-input"
              onChange={ this.onChange }
              value={ description }
              data-testid="edit-input-description"
            />
          </label>
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ buttonDisabled }
            onClick={ this.onClick }
          >
            Editar perfil
          </button>
          { saved === true && <Redirect to="/profile" /> }
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
