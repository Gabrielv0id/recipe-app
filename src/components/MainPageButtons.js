/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DataContext from '../context/DataContext';
import { handleFetch, handleButtonFetch } from '../services/fetchService';

const MAXBUTTONS = 5;
export default function MainPageButtons({ type }) {
  const { buttons, setButtons, setRecipes, recipesDB } = useContext(DataContext);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const getButtons = async () => {
      const data = await handleButtonFetch(type);
      setButtons(data[type]);
    };
    getButtons();
  }, [type, setButtons]);

  const limitButtons = buttons.slice(0, MAXBUTTONS);

  const handleClick = async (search) => {
    if (search.length > 0 && !toggle) {
      const data = await handleFetch(type, 'category', search);
      setRecipes(data[type]);
      setToggle(true);
      return;
    }
    setRecipes(recipesDB);
  };

  return (
    <div>
      <button data-testid="All-category-filter" onClick={ handleClick }>All</button>
      {limitButtons && limitButtons.map(({ strCategory }) => (
        <button
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => handleClick(strCategory) }
        >
          {strCategory}
        </button>
      ))}
    </div>
  );
}

MainPageButtons.propTypes = {
  type: PropTypes.string.isRequired,
};
