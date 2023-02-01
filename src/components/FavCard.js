import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavCard({ index, recipe, handleUnfavorite }) {
  const [copied, setCopied] = useState(false);

  const {
    id,
    type,
    category,
    alcoholicOrNot,
    name,
    image,
    nationality,
    tags,
    doneDate,
  } = recipe;

  const handleShare = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopied(true);
  };

  return (
    <section data-testid="favorite-card">
      <Link to={ `/${type}s/${id}` }>
        <img src={ image } alt={ name } data-testid={ `${index}-horizontal-image` } />
        <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {alcoholicOrNot ? `${alcoholicOrNot}` : `${nationality} - ${category}`}
      </p>
      { doneDate && <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p> }
      <div>
        <button type="button" onClick={ handleShare }>
          <img
            src={ shareIcon }
            alt="share"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <button type="button" onClick={ () => handleUnfavorite(id) }>
          <img
            src={ blackHeartIcon }
            alt="unfavorite"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
          {copied && <p>Link copied!</p>}
        </button>
      </div>
      { tags && tags.map((tag, i) => (
        <span key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</span>
      ))}
    </section>
  );
}

FavCard.defaultProps = {
  handleUnfavorite: () => {},
};

FavCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    nationality: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    doneDate: PropTypes.string,
  }).isRequired,
  handleUnfavorite: PropTypes.func,
};

export default FavCard;
