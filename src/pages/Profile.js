import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('user'));

  const clearLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <section>
      <Header title="Profile" profile />
      <h1 data-testid="profile-email">
        { user ? user.email : '' }
      </h1>
      <Link to="/done-recipes">
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ clearLocalStorage }
      >
        Logout

      </button>
      <Footer />
    </section>
  );
}

export default Profile;
