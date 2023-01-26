import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DataContext from './DataContext';

function DataProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
  });
  const [recipes, setRecipes] = useState([]);

  const value = useMemo(
    () => (
      { user, setUser, recipes, setRecipes }),
    [user, setUser, recipes, setRecipes],
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
