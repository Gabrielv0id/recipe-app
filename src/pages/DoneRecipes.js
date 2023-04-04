import { useEffect, useState } from 'react';
import Header from '../components/Header';
import FavPageButtons from '../components/FavPageButtons';
import FavCard from '../components/FavCard';

function DoneRecipes() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (!localStorage.doneRecipes) return;
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setData(recipes);
    setFilter(recipes);
  }, []);

  const handleFilter = ({ target }) => {
    if (!localStorage.getItem('doneRecipes')) return;
    const { textContent } = target;
    if (textContent === 'All') return setFilter(data);
    const value = textContent
      .slice(0, 1).toLowerCase() + textContent.slice(1, textContent.length - 1);
    const newData = data.filter((recipe) => recipe.type === value);
    setFilter(newData);
  };

  return (
    <section className="relative w-full">
      <Header title="Done Recipes" page="done" profile />
      <FavPageButtons handleFilter={ handleFilter } />
      {filter.map((recipe, index) => (
        <FavCard
          key={ index }
          index={ index }
          recipe={ recipe }
        />
      ))}
    </section>
  );
}

export default DoneRecipes;
