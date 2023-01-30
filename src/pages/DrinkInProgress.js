import PropTypes from 'prop-types';
import RecipeInProgress from '../components/RecipeInProgress';

function DrinkInProgress({ location: { pathname } }) {
  return (
    <RecipeInProgress local={ pathname } />
  );
}

DrinkInProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinkInProgress;
