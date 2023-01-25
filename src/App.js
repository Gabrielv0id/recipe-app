import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipe from './pages/Recipe';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Recipe } />
      <Route path="/drinks" component={ Recipe } />
    </Switch>
  );
}

export default App;
