import PropTypes from 'prop-types';

function Carousel({ data }) {
  return (
    <div className="carousel rounded-box mx-2 w-96">
      {data.map((item, index) => (
        <div key={ index } className="carousel-item w-1/2">
          <img src={ item.strDrinkThumb || item.strMealThumb } alt={ item.strDrink || item.strMeal } className="w-full" />
        </div>
      ))}
    </div>
  );
}

Carousel.defaultProps = {
  data: [],
};

Carousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

export default Carousel;
