/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GiMeal, GiMeat, GiGoat, GiChicken, GiCakeSlice, GiMartini } from 'react-icons/gi';
import { ImGlass } from 'react-icons/im';
import { CiBeerMugFull } from 'react-icons/ci';
import { FiCoffee } from 'react-icons/fi';
import { TbCup } from 'react-icons/tb';
import { BsEggFried } from 'react-icons/bs';
import { BiDrink } from 'react-icons/bi';
import DataContext from '../context/DataContext';
import { handleFetch, handleButtonFetch } from '../services/fetchService';

const MAXBUTTONS = 5;
export default function MainPageButtons({ type }) {
  const { buttons, setButtons, setRecipes, recipesDB } = useContext(DataContext);
  const [toggle, setToggle] = useState(false);

  const MyMeals = [
    <GiMeat key={ 0 } className="text-2xl text-yellow-400 m-auto" />,
    <BsEggFried key={ 1 } className="text-2xl text-yellow-400 m-auto" />,
    <GiChicken key={ 2 } className="text-2xl text-yellow-400 m-auto" />,
    <GiCakeSlice key={ 3 } className="text-2xl text-yellow-400 m-auto" />,
    <GiGoat key={ 4 } className="text-2xl text-yellow-400 m-auto" />,
  ];

  const MyDrinks = [
    <ImGlass key={ 0 } className="text-2xl text-yellow-400 m-auto" />,
    <GiMartini key={ 1 } className="text-2xl text-yellow-400 m-auto" />,
    <TbCup key={ 2 } className="text-2xl text-yellow-400 m-auto" />,
    <CiBeerMugFull key={ 3 } className="text-2xl text-yellow-400 m-auto" />,
    <FiCoffee key={ 4 } className="text-2xl text-yellow-400 m-auto" />,
  ];

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
    <div className="flex justify-evenly">
      <div className="flex flex-col justify-center items-center gap-1">
        <button
          data-testid="All-category-filter"
          onClick={ handleClick }
          className="text-yellow-300 rounded-full border p-2 border-yellow-400"
        >
          { type === 'meals' ? <GiMeal className="text-2xl text-yellow-400 m-auto" /> : <BiDrink className="text-2xl text-yellow-400 m-auto" />}
        </button>
        <span className="text-[10px]">All</span>
      </div>
      {limitButtons && limitButtons.map(({ strCategory }, index) => (
        <div key={ index } className="flex flex-col justify-center items-center gap-1">
          <button
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleClick(strCategory) }
            className="text-yellow-300 rounded-full border p-2 border-yellow-400"
          >
            {type === 'meals' ? MyMeals[index] : MyDrinks[index]}
          </button>
          <span className="text-[10px]">{strCategory}</span>
        </div>
      ))}
    </div>
  );
}

MainPageButtons.propTypes = {
  type: PropTypes.string.isRequired,
};
