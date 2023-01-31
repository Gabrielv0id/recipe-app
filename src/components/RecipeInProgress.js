import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { handleFetchWithId } from '../services/fetchService';

export default function RecipeInProgress({ local }) {
  const type = local.split('/')[1];
  const id = local.split('/')[2];
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
    const url = `http://localhost:3000${local}`;
    const parts = url.split('/in-progress');
    const result = parts[0];
    copy(result);
    setLinkCopied(true);
  };
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

  return (
    <div>
      <h1 data-testid="recipe-title">{ inProgress.strMeal || inProgress.strDrink }</h1>
      <img
        data-testid="recipe-photo"
        src={ inProgress.strMealThumb || inProgress.strDrinkThumb }
        alt={ inProgress.strMeal || inProgress.strDrink }
      />
      <h2 data-testid="recipe-category">
        { inProgress.strAlcoholic || inProgress.strCategory }
      </h2>
      {inProgress.ingredients.map((ingredient, index) => (
        <label
          htmlFor={ ingredient }
          key={ ingredient }
          data-testid={ `${index}-ingredient-step` }
          className={ checkedList[index] ? 'active' : '' }
        >
          <input
            type="checkbox"
            name={ ingredient }
            id={ ingredient }
            checked={ checkedList[index] }
            onChange={ () => changeValue(index) }
          />
          {`${ingredient} - ${inProgress.measures[index]}`}
        </label>
      ))}

      <hr />
      <h3>Instructions</h3>
      <p data-testid="instructions">{ inProgress.strInstructions }</p>
      <hr />
      {linkCopied && (
        <div>
          <span>Link copied!</span>
        </div>
      )}
      <button
        onClick={ handleCopy }
      >
        <img src={ shareIcon } alt="share" data-testid="share-btn" />
      </button>
      <button onClick={ favorite ? handleRemoveFavorite : handleFavorite }>
        <img
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
          data-testid="favorite-btn"
        />
      </button>
      <button
        data-testid="finish-recipe-btn"
        disabled={ disabled }
        onClick={ handleFinishRecipe }
      >
        Receita Finalizada
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  local: PropTypes.string.isRequired,
};
