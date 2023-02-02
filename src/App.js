import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './components/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route
        exact
        path="/meals/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route
        exact
        path="/drinks/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route
        path="/meals/:id/in-progress"
        render={ (props) => <RecipeInProgress { ...props } /> }
      />
      <Route
        path="/drinks/:id/in-progress"
        render={ (props) => <RecipeInProgress { ...props } /> }
      />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
