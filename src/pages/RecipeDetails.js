import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Carousel from '../components/Carousel';
import DataContext from '../context/DataContext';
import { handleFetchWithId, handleRecommendations } from '../services/fetchService';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import emptyFavoriteIcon from '../images/whiteHeartIcon.svg';

function RecipeDetails({ location: { pathname } }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const type = pathname.split('/')[1];
  const id = pathname.split('/')[2];

  const { recipe, setRecipe } = useContext(DataContext);

  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {},
        meals: {},
      }));
    } else {
      const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (type === 'meals') {
        const inProgressMeals = inProgressRecipe.meals;
        if (inProgressMeals[id]) setInProgress(true);
      } else {
        const inProgressDrinks = inProgressRecipe.drinks;
        if (inProgressDrinks[id]) setInProgress(true);
      }
    }
  }, [id, type]);

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

  useEffect(() => {
    const fetchIdData = async () => {
      let data;
      if (type === 'meals') {
        const { meals } = await handleFetchWithId(type, id);
        [data] = meals;
        const { drinks } = await handleRecommendations('drinks');
        setRecommendations(drinks);
      } else {
        const { drinks } = await handleFetchWithId(type, id);
        [data] = drinks;
        const { meals } = await handleRecommendations('meals');
        setRecommendations(meals);
      }
      const ingredients = Object.entries(data)
        .filter(([key, value]) => key.includes('strIngredient') && value)
        .map(([, value]) => value);
      const measures = Object.entries(data)
        .filter(([key, value]) => key.includes('strMeasure') && value)
        .map(([, value]) => value);
      const newData = { ...data, ingredients, measures };
      setRecipe(newData);
    };

    fetchIdData();
  }, [type, id]);

  const handleStart = () => {
    const { idMeal, idDrink, ingredients } = recipe;
    if (type === 'meals') {
      const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newInProgressRecipes = {
        ...inProgressRecipe,
        meals: {
          ...inProgressRecipe.meals,
          [idMeal]: ingredients,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
      setInProgress(true);
      history.push(`/meals/${id}/in-progress`);
    } else {
      const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newInProgressRecipes = {
        ...inProgressRecipe,
        drinks: {
          ...inProgressRecipe.drinks,
          [idDrink]: ingredients,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
      setInProgress(true);
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  const handleVideo = (url) => `https://www.youtube.com/embed/${url.split('/')[3]}`;

  const handleCopy = () => {
    copy(`http://localhost:3000${pathname}`);
    setLinkCopied(true);
  };

  const handleFavorite = () => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (type === 'meals') {
      const newFavoriteRecipes = [...favoriteRecipes, {
        id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      const newFavoriteRecipes = [...favoriteRecipes, {
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    setFavorite((prevState) => !prevState);
  };

  const handleRemoveFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (type === 'meals') {
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipes) => recipes.id !== recipe.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipes) => recipes.id !== recipe.idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    setFavorite((prevState) => !prevState);
  };

  return (
    <section>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
      />
      <h1 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink }</h1>
      <h2 data-testid="recipe-category">{ recipe.strAlcoholic || recipe.strCategory }</h2>
      <div>
        <button onClick={ handleCopy }>
          <img src={ shareIcon } alt="share" data-testid="share-btn" />
        </button>
        <button
          onClick={ favorite ? handleRemoveFavorite : handleFavorite }
        >
          <img
            src={ favorite ? favoriteIcon : emptyFavoriteIcon }
            alt="favorite"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      {linkCopied && (
        <div>
          <span>Link copied!</span>
        </div>
      )}
      <hr />
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ `${ingredient}-${index}` }
          >
            {`${ingredient} - ${recipe.measures[index]}`}
          </li>
        ))}
      </ul>
      <hr />
      <h3>Instructions</h3>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <hr />
      <h3>Video</h3>
      {recipe.strYoutube
        && <iframe
          data-testid="video"
          src={ handleVideo(recipe.strYoutube) }
          title="video"
        />}
      <hr />
      <h3>Recomendadas</h3>
      <Carousel data={ recommendations } />
      <button
        data-testid="start-recipe-btn"
        className="recipe-btn"
        onClick={ handleStart }
      >
        { !inProgress ? 'Start Recipe' : 'Continue Recipe' }
      </button>
    </section>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeDetails;
