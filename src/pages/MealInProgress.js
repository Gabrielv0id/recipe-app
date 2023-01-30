import PropTypes from 'prop-types';
import RecipeInProgress from '../components/RecipeInProgress';

function MealInProgress({ location: { pathname } }) {
  return (
    <RecipeInProgress local={ pathname } />
  );
}

MealInProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
export default MealInProgress;
