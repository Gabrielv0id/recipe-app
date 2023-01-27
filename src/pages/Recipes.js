import { useContext } from 'react';
import DataContext from '../context/DataContext';
import Card from '../components/Card';

// Constante
const MAXRECIPES = 12;

function Recipe() {
  const { recipes } = useContext(DataContext);

  let limitRecipes = recipes;
  if (recipes.length > MAXRECIPES) limitRecipes = recipes.slice(0, MAXRECIPES);

  return (
    <section>
      {limitRecipes && limitRecipes.map((recipe, index) => (
        <Card
          key={ recipe.idMeal || recipe.idDrink }
          index={ index }
          name={ recipe.strMeal || recipe.strDrink }
          img={ recipe.strMealThumb || recipe.strDrinkThumb }
        />
      ))}
    </section>
  );
}

export default Recipe;
