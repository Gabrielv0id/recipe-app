import { useEffect, useState } from 'react';
import FavCard from '../components/FavCard';
import FavPageButtons from '../components/FavPageButtons';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) return;
    const localData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setData(localData);
    setFilter(localData);
  }, []);
  console.log(data);

  const handleFilter = ({ target }) => {
    if (!localStorage.getItem('favoriteRecipes')) return;
    const { textContent } = target;
    if (textContent === 'All') return setFilter(data);
    const value = textContent
      .slice(0, 1).toLowerCase() + textContent.slice(1, textContent.length - 1);
    console.log(value);
    const newData = data.filter((recipe) => recipe.type === value);
    setFilter(newData);
  };

  const handleUnfavorite = (id) => {
    const localData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newData = localData.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
    setData(newData);
    setFilter(newData);
  };

  return (
    <section>
      <Header title="Favorite Recipes" profile />
      <FavPageButtons handleFilter={ handleFilter } />
      {filter.map((recipe, index) => (
        <FavCard
          key={ recipe.id }
          index={ index }
          recipe={ recipe }
          handleUnfavorite={ handleUnfavorite }
        />
      ))}
    </section>
  );
}

export default FavoriteRecipes;
