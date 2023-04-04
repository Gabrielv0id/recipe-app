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

  const handleFilter = ({ target }) => {
    if (!localStorage.getItem('favoriteRecipes')) return;
    const { textContent } = target;
    if (textContent === 'All') return setFilter(data);
    const value = textContent
      .slice(0, 1).toLowerCase() + textContent.slice(1, textContent.length - 1);
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
    <section className="relative w-full">
      <Header title="Favorites" page="favorite" profile />
      <FavPageButtons handleFilter={ handleFilter } />
      <section className="flex flex-col gap-4">
        {filter.map((recipe, index) => (
          <FavCard
            key={ recipe.id }
            index={ index }
            recipe={ recipe }
            handleUnfavorite={ handleUnfavorite }
            fromFav
          />
        ))}
      </section>
    </section>
  );
}

export default FavoriteRecipes;
