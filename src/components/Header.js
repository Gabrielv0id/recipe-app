import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, profile, search, type }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const history = useHistory();

  const handleClick = () => {
    history.push('/profile');
  };

  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      {profile && (
        <button type="button" onClick={ handleClick }>
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </button>)}
      {search && (
        <button type="button" onClick={ () => setShowSearchBar(!showSearchBar) }>
          <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
        </button>)}
      {showSearchBar && <SearchBar type={ type } />}
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
