import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DataContext from './DataContext';

function DataProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
  });
  const [recipes, setRecipes] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [recipesDB, setRecipesDB] = useState([]);

  const value = useMemo(
    () => (
      { user,
        setUser,
        recipes,
        setRecipes,
        buttons,
        setButtons,
        recipesDB,
        setRecipesDB }),
    [user, setUser, recipes, setRecipes, buttons, setButtons, recipesDB, setRecipesDB],
  );

  return (
    <DataContext.Provider value={ value }>
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
