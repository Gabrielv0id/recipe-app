import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { IoShareSocial } from 'react-icons/io5';
import { BiArrowBack } from 'react-icons/bi';
import Carousel from '../components/Carousel';
import DataContext from '../context/DataContext';
import { handleFetchWithId, handleRecommendations } from '../services/fetchService';

const TIMER = 3000;

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
  }, [type, id, setRecipe]);

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

  const handleGoBack = () => {
    history.push(`/${type}`);
  };

  return (
    <section className="flex flex-col">
      <div className="relative">
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 w-full h-11 bg-black opacity-40" />
        <h1
          data-testid="recipe-title"
          className="absolute text-2xl text-white font-bold opacity-100 bottom-4"
        >
          { recipe.strMeal || recipe.strDrink }
        </h1>
        <h2
          data-testid="recipe-category"
          className="absolute text-md text-white bottom-0 transform "
        >
          { recipe.strAlcoholic || recipe.strCategory }
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
            {favorite ? <IoMdHeart
              className="text-yellow-400 font-bold text-4xl"
            /> : <IoMdHeartEmpty className="text-yellow-400 font-bold text-4xl" /> }
          </button>
        </div>
        {linkCopied && (
          <div className="absolute top-2 left-2">
            <div
              className="flex
              justify-center
              items-center gap-2
              p-2 bg-success w-full rounded-md text-center font-bold shadow-2xl"
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
      <ul className="border rounded-md m-2 p-2">
        {recipe.ingredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ `${ingredient}-${index}` }
          >
            {`${ingredient} - ${recipe.measures[index]}`}
          </li>
        ))}
      </ul>
      <div className="divider" />
      <h3 className="text-xl font-bold m-2 px-1">Instructions</h3>
      <p
        data-testid="instructions"
        className="border rounded-md m-2 p-2"
      >
        { recipe.strInstructions }
      </p>
      {recipe.strYoutube && (
        <>
          <div className="divider" />
          <h3 className="text-xl font-bold m-2 px-1">Video</h3>
          <div className="m-2">
            {recipe.strYoutube
          && <iframe
            data-testid="video"
            src={ handleVideo(recipe.strYoutube) }
            title="video"
            className="w-full"
          />}
          </div>
        </>
      )}
      <div className="divider" />
      <h3 className="text-xl font-bold m-2 px-1">Recomendadas</h3>
      <div className="m-2">
        <Carousel data={ recommendations } />
        <button
          data-testid="start-recipe-btn"
          className="recipe-btn"
          className="my-4 w-full bg-yellow-400 text-white font-bold py-2 px-4 uppercase mx-auto rounded"
          onClick={ handleStart }
        >
          { !inProgress ? 'Start Recipe' : 'Continue Recipe' }
        </button>
      </div>
    </section>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeDetails;
