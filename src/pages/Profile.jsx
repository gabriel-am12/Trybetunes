import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.recoverUserInfo();
  }

  recoverUserInfo = async () => {
    this.setState({ loading: true }, async () => {
      const profileInfo = await getUser();
      this.setState({ profileInfo, loading: false });
    });
  }

  render() {
    const { profileInfo: { description, email, image, name }, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <img data-testid="profile-image" src={ image } alt="User" />
            <div>
              <label htmlFor="profileDescription">
                Descrição:
                <p>{description}</p>
              </label>
              <label htmlFor="profileEmail">
                Email:
                <p>{email}</p>
              </label>
              <label htmlFor="profileName">
                Nome:
                <p>{name}</p>
              </label>
            </div>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
