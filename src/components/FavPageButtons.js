import PropTypes from 'prop-types';

function FavPageButtons({ handleFilter }) {
  return (
    <section>
      <button
        onClick={ handleFilter }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ handleFilter }
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ handleFilter }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    </section>
  );
}

FavPageButtons.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default FavPageButtons;
