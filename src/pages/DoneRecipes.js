import { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FavPageButtons from '../components/FavPageButtons';

function DoneRecipes() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('doneRecipes')) return;
    const localData = JSON.parse(localStorage.getItem('doneRecipes'));
    setData(localData);
    setFilter(localData);
  }, []);

  const handleFilter = ({ target }) => {
    if (!localStorage.getItem('doneRecipes')) return;
    const { textContent } = target;
    if (textContent === 'All') return setFilter(data);
    const value = textContent
      .slice(0, 1).toLowerCase() + textContent.slice(1, textContent.length - 1);
    console.log(value);
    const newData = data.filter((recipe) => recipe.type === value);
    setFilter(newData);
  };

  return (
    <section>
      <Header title="Done Recipes" profile />
      <FavPageButtons handleFilter={ handleFilter } />
      {filter.map((recipe, index) => (
        <DoneRecipes key={ index } index={ index } recipe={ recipe } />
      ))}
    </section>
  );
}

DoneRecipes.defaultProps = {
  // handleUnfavorite: () => { },
};

export default DoneRecipes;
DoneRecipes.propTypes = {
  // index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    nationality: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    doneDate: PropTypes.string,
  }).isRequired,
  // handleUnfavorite: PropTypes.func,
};
