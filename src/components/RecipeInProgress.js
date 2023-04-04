import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { IoShareSocial } from 'react-icons/io5';
import { BiArrowBack } from 'react-icons/bi';
import { handleFetchWithId } from '../services/fetchService';

const TIMER = 3000;

export default function RecipeInProgress({ location: { pathname } }) {
  const type = pathname.split('/')[1];
  const id = pathname.split('/')[2];
  const [inProgress, setInProgress] = useState({
    ingredients: [],
    measures: [],
  });
  const [linkCopied, setLinkCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [checkedList,
    setCheckedList] = useState(Array(inProgress.ingredients.length).fill(false));
  const [disabled, setDisabled] = useState(true);

  const history = useHistory();
  useEffect(() => {
    const fetchIdData = async () => {
      let data;
      if (type === 'meals') {
        const { meals } = await handleFetchWithId(type, id);
        [data] = meals;
      } else {
        const { drinks } = await handleFetchWithId(type, id);
        [data] = drinks;
      }
      const ingredients = Object.entries(data)
        .filter(([key, value]) => key.includes('strIngredient') && value)
        .map(([, value]) => value).filter((item) => item !== null);
      const measures = Object.entries(data)
        .filter(([key, value]) => key.includes('strMeasure') && value)
        .map(([, value]) => value).filter((item) => item !== null);
      const newData = { ...data, ingredients, measures };
      setInProgress(newData);
    };

    fetchIdData();
  }, [type, id]);

  useEffect(() => {
    const allChecked = checkedList.every((item) => item);
    if (checkedList.length === inProgress.ingredients.length) {
      setDisabled(!allChecked);
    }
    if (checkedList.length === 0) setDisabled(true);
  }, [checkedList, inProgress.ingredients.length]);

  useEffect(() => {
    const storedCheckedList = JSON
      .parse(localStorage.getItem('checkedList'))
      || Array(inProgress.ingredients.length).fill(false);
    setCheckedList(storedCheckedList);
  }, [inProgress]);

  useEffect(() => {
    localStorage.setItem('checkedList', JSON.stringify(checkedList));
  }, [checkedList]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (type === 'meals') {
        const favoriteMeals = favoriteRecipes
          .filter((recipes) => recipes.type === 'meal');
        const favoriteMealIds = favoriteMeals.map((recipes) => recipes.id);
        if (favoriteMealIds.includes(id)) setFavorite(true);
      } else {
        const favoriteDrinks = favoriteRecipes
          .filter((recipes) => recipes.type === 'drink');
        const favoriteDrinkIds = favoriteDrinks.map((recipes) => recipes.id);
        if (favoriteDrinkIds.includes(id)) setFavorite(true);
      }
    }
  }, [id, type]);

  const changeValue = (index) => {
    const updatedCheckedList = [...checkedList];
    updatedCheckedList[index] = !checkedList[index];
    setCheckedList(updatedCheckedList);
  };

  const handleCopy = () => {
    const url = `http://localhost:3000${pathname}`;
    const parts = url.split('/in-progress');
    const result = parts[0];
    copy(result);
    setLinkCopied(true);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setLinkCopied(false);
    }, TIMER);
    return () => clearTimeout(timeOut);
  }, [linkCopied]);

  const handleFavorite = () => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (type === 'meals') {
      const newFavoriteRecipes = [...favoriteRecipes, {
        id: inProgress.idMeal,
        type: 'meal',
        nationality: inProgress.strArea,
        category: inProgress.strCategory,
        alcoholicOrNot: '',
        name: inProgress.strMeal,
        image: inProgress.strMealThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      const newFavoriteRecipes = [...favoriteRecipes, {
        id: inProgress.idDrink,
        type: 'drink',
        nationality: '',
        category: inProgress.strCategory,
        alcoholicOrNot: inProgress.strAlcoholic,
        name: inProgress.strDrink,
        image: inProgress.strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    setFavorite((prevState) => !prevState);
  };

  const handleRemoveFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (type === 'meals') {
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipes) => recipes.id !== inProgress.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipes) => recipes.id !== inProgress.idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    setFavorite((prevState) => !prevState);
  };

  const handleFinishRecipe = () => {
    const date = new Date();
    const currentDate = date.toISOString();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (type === 'meals') {
      const newDoneRecipes = [...doneRecipes, {
        id: inProgress.idMeal,
        type: 'meal',
        nationality: inProgress.strArea,
        category: inProgress.strCategory,
        alcoholicOrNot: '',
        name: inProgress.strMeal,
        image: inProgress.strMealThumb,
        doneDate: currentDate,
        tags: inProgress.strTags ? inProgress.strTags.split(',') : [],
      }];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    } else {
      const newDoneRecipes = [...doneRecipes, {
        id: inProgress.idDrink,
        type: 'drink',
        nationality: '',
        category: inProgress.strCategory,
        alcoholicOrNot: inProgress.strAlcoholic,
        name: inProgress.strDrink,
        image: inProgress.strDrinkThumb,
        doneDate: currentDate,
        tags: [],
      }];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    }
    history.push('/done-recipes');
  };

  const handleGoBack = () => {
    history.push(`/${type}/${id}`);
  };

  return (
    <section className="flex flex-col">
      <div className="relative">
        <div className="absolute bottom-0 w-full h-11 bg-black opacity-40" />
        <h1
          data-testid="recipe-title"
          className="absolute text-2xl text-white font-bold opacity-100 bottom-4"
        >
          { inProgress.strMeal || inProgress.strDrink }
        </h1>
        <img
          data-testid="recipe-photo"
          src={ inProgress.strMealThumb || inProgress.strDrinkThumb }
          alt={ inProgress.strMeal || inProgress.strDrink }
        />
        <h2
          data-testid="recipe-category"
          className="absolute text-md text-white bottom-0 transform"
        >
          { inProgress.strAlcoholic || inProgress.strCategory }
        </h2>
        <div className="absolute top-25 right-0 m-2 space-x-2">
          <button onClick={ handleCopy }>
            <IoShareSocial
              data-testid="share-btn"
              className="text-yellow-400 font-bold text-4xl"
            />
          </button>
          <button
            onClick={ favorite ? handleRemoveFavorite : handleFavorite }
          >
            {favorite
              ? <IoMdHeart className="text-yellow-400 font-bold text-4xl" />
              : <IoMdHeartEmpty className="text-yellow-400 font-bold text-4xl" /> }
          </button>
        </div>
        {linkCopied && (
          <div className="absolute top-2 left-2">
            <div
              className="flex
                justify-center
                items-center gap-2
                p-2 bg-success w-full
                rounded-md
                text-center
                font-bold shadow-2xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Link copied!</span>
            </div>
          </div>
        )}
        <div className="absolute top-0 left-0">
          <BiArrowBack
            className="text-yellow-500 text-4xl m-1 cursor-pointer drop-shadow-lg"
            onClick={ handleGoBack }
          />
        </div>
      </div>
      <h3 className="text-xl font-bold m-2 px-1">Ingredients</h3>
      <div className="border rounded-md flex flex-col m-2 p-2">
        {inProgress.ingredients.map((ingredient, index) => (
          <label
            htmlFor={ ingredient }
            key={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            className={ checkedList[index] ? 'active flex flex-row gap-2' : 'flex flex-row gap-2' }
          >
            <input
              type="checkbox"
              name={ ingredient }
              id={ ingredient }
              checked={ checkedList[index] }
              className="checkbox checkbox-warning checkbox-sm"
              onChange={ () => changeValue(index) }
            />
            <p>
              {`${ingredient} - ${inProgress.measures[index]}`}
            </p>
          </label>
        ))}
      </div>
      <div className="divider" />
      <h3 className="text-xl font-bold m-2 px-1">Instructions</h3>
      <p data-testid="instructions" className="border rounded-md m-2 p-2">{ inProgress.strInstructions }</p>
      <button
        data-testid="finish-recipe-btn"
        disabled={ disabled }
        onClick={ handleFinishRecipe }
        // eslint-disable-next-line max-len
        className="my-4 w-10/12 bg-yellow-400 text-white font-bold py-2 px-4 uppercase mx-auto rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        Receita Finalizada
      </button>
    </section>
  );
}
RecipeInProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
