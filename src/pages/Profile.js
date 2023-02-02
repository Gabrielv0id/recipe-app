import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { BsCheck2Circle } from 'react-icons/bs';
import { BiHeartCircle } from 'react-icons/bi';
import { RiLogoutCircleRLine } from 'react-icons/ri';
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
    <section className="w-full">
      <Header title="Profile" profile />
      <div className="flex flex-col justify-start items-center gap-4 w-full">
        <h1 data-testid="profile-email" className="font-bold">
          { user ? user.email : '' }
        </h1>
        <div className="w-full flex flex-col justify-center items-center mt-4">
          <Link to="/done-recipes" className="flex gap-2">
            <BsCheck2Circle className="text-4xl text-yellow-400 m-auto" />
            <button type="button" data-testid="profile-done-btn">Done Recipes</button>
          </Link>
          <div className="divider w-3/4 self-center" />
          <Link to="/favorite-recipes" className="flex gap-2">
            <BiHeartCircle className="text-4xl text-yellow-400 m-auto" />
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Favorite Recipes
            </button>
          </Link>
          <div className="divider w-3/4 self-center" />
          <div className="flex gap-2">
            <RiLogoutCircleRLine className="text-4xl text-yellow-400 m-auto" />
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ clearLocalStorage }
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Profile;
