import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import { handleFetchWithId, handleRecommendations } from '../services/fetchService';

function RecipeDetails({ location: { pathname } }) {
  const [recommendations, setRecommendations] = useState([]);
  const [recipe, setRecipe] = useState({
    ingredients: [],
    measures: [],
  });
  const type = pathname.split('/')[1];
  const id = pathname.split('/')[2];

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
      <button data-testid="start-recipe-btn" className="recipe-btn">Start Recipe</button>
    </section>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeDetails;
