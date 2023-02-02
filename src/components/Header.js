import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CgProfile, CgSearch } from 'react-icons/cg';
import { GiMeal } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import SearchBar from './SearchBar';
import icon from '../images/iconLogo.svg';

function Header({ title, profile, search, type }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const history = useHistory();

  const handleClick = () => {
    history.push('/profile');
  };

  return (
    <header>
      <div className="flex flex-row justify-between bg-yellow-300 p-1">
        <div className="flex flex-row justify-center items-center gap-4 pl-2">
          <img src={ icon } alt="logo" />
          <h3 className="uppercase text-purple-800 font-medium text-xl">
            recipes
            <span className="lowercase font-bold"> app</span>
          </h3>
        </div>
        <div className="flex justify-center items-center gap-2 pr-2">
          {search && (
            <button type="button" onClick={ () => setShowSearchBar(!showSearchBar) }>
              <CgSearch className="text-3xl text-purple-800" />
            </button>)}
          {profile && (
            <button type="button" onClick={ handleClick }>
              <CgProfile className="text-3xl text-purple-800" />
            </button>)}
        </div>
      </div>
      {showSearchBar && <SearchBar type={ type } />}
      <div className="my-4">
        { type === 'meals' ? <GiMeal className="text-5xl text-yellow-400 m-auto" /> : <BiDrink className="text-5xl text-yellow-400 m-auto" /> }
        <h1 data-testid="page-title" className="uppercase text-purple-800 font-bold text-2xl text-center">{title}</h1>
      </div>
    </header>
  );
}

Header.defaultProps = {
  profile: false,
  search: false,
  type: '',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  profile: PropTypes.bool,
  search: PropTypes.bool,
  type: PropTypes.string,
};

export default Header;
