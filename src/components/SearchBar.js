import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { handleFetchSearch } from '../services/fetchService';
import DataContext from '../context/DataContext';

// type define se o usuario esta no drinks or meals
function SearchBar({ type }) {
  const [searchData, setSearchData] = useState({
    search: '',
    filter: '',
  });

  const history = useHistory();
  const { setRecipes } = useContext(DataContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { search, filter } = searchData;

    // Validação de busca
    if (filter === 'first-letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    // Pega dados da API baseado no tipo, filtro e busca
    const data = await handleFetchSearch(type, filter, search);

    // Verifica se o retorno é unico, se for, redireciona para a pagina do item
    if (data[type].length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (data[type].length === 1) {
      const uniqueId = data[type][0].idMeal || data[type][0].idDrink;
      history.push(`/${type}/${uniqueId}`);
    } else {
      setRecipes(data[type]);
    }

    setSearchData({
      search: '',
      filter: '',
    });
  };

  const { search } = searchData;

  return (
    <form
      onSubmit={ handleSubmit }
      className="flex
      flex-col
      gap-2
      justify-center
      itemces-center border bg-purple-800 m-2 w-full max-w-xs mx-auto rounded-lg"
    >
      <input
        type="text"
        placeholder="Pesquisar"
        name="search"
        value={ search }
        data-testid="search-input"
        className="input input-bordered input-primary w-full max-w-xs"
        onChange={ handleChange }
      />
      <div className="flex flex-row gap-2 justify-center items-center">
        <label
          htmlFor="ingredient-search-radio"
          className="flex items-center justify-center gap-1 text-white text-xs"
        >
          <input
            type="radio"
            id="ingredient-search-radio"
            name="filter"
            value="ingredient"
            data-testid="ingredient-search-radio"
            className="radio radio-warning radio-xs"
            onChange={ handleChange }
          />
          <span>Ingredient</span>
        </label>
        <label
          htmlFor="name-search-radio"
          className="flex items-center justify-center gap-1 text-white text-xs"

        >
          <input
            type="radio"
            name="filter"
            value="name"
            data-testid="name-search-radio"
            className="radio radio-warning radio-xs"
            id="name-search-radio"
            onChange={ handleChange }
          />
          <span>Name</span>
        </label>
        <label
          htmlFor="first-letter-search-radio"
          className="flex items-center justify-center gap-1 text-white text-xs"
        >
          <input
            type="radio"
            name="filter"
            value="first-letter"
            data-testid="first-letter-search-radio"
            className="radio radio-warning radio-xs"
            id="first-letter-search-radio"
            onChange={ handleChange }
          />
          <span>Primeira letra</span>
        </label>
      </div>
      <button
        type="submit"
        data-testid="exec-search-btn"
        className="w-3/4 mx-auto bg-yellow-400 text-white rounded-lg p-1 m-2"
      >
        Buscar
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBar;
