import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { handleFetchWithId, handleRecommendations } from '../services/fetchService';

function RecipeDetails({ location: { pathname } }) {
  const [recommendations, setRecommendations] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [recipe, setRecipe] = useState({
    ingredients: [],
    measures: [],
  });
  const type = pathname.split('/')[1];
  const id = pathname.split('/')[2];

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
  }, []);

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

  const handleVideo = (url) => {
    if (!url) return '';
    return `https://www.youtube.com/embed/${url.split('/')[3]}`;
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
