/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DataContext from '../context/DataContext';
import Card from './Card';
import { handleFetch } from '../services/fetchService';

// Constante
const MAXRECIPES = 12;

function Recipes({ type }) {
  const { recipes, setRecipes, setRecipesDB } = useContext(DataContext);

  useEffect(() => {
    const getRecipes = async () => {
      const data = await handleFetch(type);
      setRecipes(data[type]);
      setRecipesDB(data[type]);
    };
    getRecipes();
  }, [type, setRecipes, setRecipesDB]);

  let limitRecipes = recipes;
  if (recipes.length > MAXRECIPES) limitRecipes = recipes.slice(0, MAXRECIPES);

  return (
    <section className="m-2 grid grid-cols-2 gap-2">
      {limitRecipes && limitRecipes.map((recipe, index) => (
        <Link
          to={ `/${type}/${recipe.idMeal || recipe.idDrink}` }
          key={ recipe.idMeal || recipe.idDrink }
        >
          <Card
            index={ index }
            name={ recipe.strMeal || recipe.strDrink }
            img={ recipe.strMealThumb || recipe.strDrinkThumb }
            type
          />
        </Link>
      ))}
    </section>
  );
}

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Recipes;
