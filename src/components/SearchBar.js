import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { handleFetch } from '../services/fetchService';
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
    const data = await handleFetch(type, filter, search);
    //
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
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        placeholder="Pesquisar"
        name="search"
        value={ search }
        data-testid="search-input"
        onChange={ handleChange }
      />
      <div>
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            id="ingredient-search-radio"
            name="filter"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
          />
          Ingredient
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            name="filter"
            value="name"
            data-testid="name-search-radio"
            id="name-search-radio"
            onChange={ handleChange }
          />
          Name
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="filter"
            value="first-letter"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            onChange={ handleChange }
          />
          Primeira letra
        </label>
      </div>
      <button type="submit" data-testid="exec-search-btn">
        Buscar
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBar;
