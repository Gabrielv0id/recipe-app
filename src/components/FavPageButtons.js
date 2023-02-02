import PropTypes from 'prop-types';
import { IoFastFoodOutline } from 'react-icons/io5';
import { ImGlass } from 'react-icons/im';
import { GiMeal } from 'react-icons/gi';

function FavPageButtons({ handleFilter }) {
  return (
    <section className="flex justify-evenly items-center my-2">
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={ handleFilter }
          type="button"
          data-testid="filter-by-all-btn"
          className="text-yellow-300 rounded-full border p-2 border-yellow-400"
        >
          <IoFastFoodOutline className="text-2xl text-yellow-400 m-auto" />
        </button>
        <span className="text-[10px]">All</span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={ handleFilter }
          type="button"
          data-testid="filter-by-meal-btn"
          className="text-yellow-300 rounded-full border p-2 border-yellow-400"
        >
          <GiMeal className="text-2xl text-yellow-400 m-auto" />
        </button>
        <span className="text-[10px]">Meals</span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={ handleFilter }
          type="button"
          data-testid="filter-by-drink-btn"
          className="text-yellow-300 rounded-full border p-2 border-yellow-400"
        >
          <ImGlass className="text-2xl text-yellow-400 m-auto" />
        </button>
        <span className="text-[10px]">Drinks</span>
      </div>
    </section>
  );
}

FavPageButtons.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default FavPageButtons;
