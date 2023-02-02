import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoShareSocial } from 'react-icons/io5';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
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
    doneDate,
    tags,
  } = recipe;

  const handleShare = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopied(true);
  };

  return (
    <section data-testid="favorite-card" className="flex w-11/12 mx-auto border-2 rounded-md shadow-xl">
      <div className="w-1/2">
        <Link to={ `/${type}s/${id}` }>
          <img src={ image } alt={ name } data-testid={ `${index}-horizontal-image` } />
        </Link>
      </div>
      <div className="flex flex-col justify-evenly w-1/2 pl-3">
        <div>
          <Link to={ `/${type}s/${id}` }>
            <h3 data-testid={ `${index}-horizontal-name` } className="text-xl font-bold truncate">{name}</h3>
          </Link>
          <p
            data-testid={ `${index}-horizontal-top-text` }
            className="text-xs"
          >
            {alcoholicOrNot ? `${alcoholicOrNot}` : `${nationality} - ${category}`}
          </p>
        </div>
        { doneDate && <p data-testid={ `${index}-horizontal-done-date` } className="text-xs">{doneDate.slice(0, 10)}</p> }
        <div className="flex gap-2">
          <button type="button" onClick={ handleShare }>
            <IoShareSocial data-testid="share-btn" className="text-yellow-400 font-bold text-4xl" />
          </button>
          <button type="button" onClick={ () => handleUnfavorite(id) }>
            <IoMdHeart className="text-yellow-400 font-bold text-4xl" />
          </button>
        </div>
        {copied && <span className="text-xs">Link copied!</span>}
        <div className="flex">
          { tags && tags.map((tag, i) => (
            <span key={ i } data-testid={ `${index}-${tag}-horizontal-tag` } className="text-xs badge badge-outline truncate">{tag}</span>
          ))}
        </div>
      </div>
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
