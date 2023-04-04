import PropTypes from 'prop-types';

function Card({ index, img, name }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="w-full border border-gray-300 rounded-md shadow-2xl text-center"
    >
      <img
        src={ img }
        alt={ name }
        data-testid={ `${index}-card-img` }
        className="rounded-l-md"
      />
      <h3 data-testid={ `${index}-card-name` } className="text-sm p-1">{name}</h3>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Card;
