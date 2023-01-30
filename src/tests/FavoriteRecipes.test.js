import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { favoriteMock } from './mocks/mockData';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const favoritePath = '/favorite-recipes';
const favoriteCardStr = 'favorite-card';

describe('FavoriteRecipes', () => {
  beforeEach(() => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteMock));
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  test('Se renderiza a pagina de favoritos', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push(favoritePath);
    expect(history.location.pathname).toBe(favoritePath);

    const title = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(title).toBeInTheDocument();
  });

  test('Se renderiza a pagina de favoritos com os elementos', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push(favoritePath);
    expect(history.location.pathname).toBe(favoritePath);

    const title = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(title).toBeInTheDocument();

    const allFilter = screen.getByRole('button', { name: /all/i });
    expect(allFilter).toBeInTheDocument();

    const foodFilter = screen.getByRole('button', { name: /meals/i });
    expect(foodFilter).toBeInTheDocument();

    const drinkFilter = screen.getByRole('button', { name: /drinks/i });
    expect(drinkFilter).toBeInTheDocument();
  });

  test('Se renderiza os itens salvos no favoritos', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push(favoritePath);
    expect(history.location.pathname).toBe(favoritePath);

    const title = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(title).toBeInTheDocument();

    const allFilter = screen.getByRole('button', { name: /all/i });
    expect(allFilter).toBeInTheDocument();

    const foodFilter = screen.getByRole('button', { name: /meals/i });
    expect(foodFilter).toBeInTheDocument();

    const drinkFilter = screen.getByRole('button', { name: /drinks/i });
    expect(drinkFilter).toBeInTheDocument();

    const favoriteRecipes = screen.getAllByTestId(favoriteCardStr);
    expect(favoriteRecipes).toHaveLength(2);
  });

  test('Se clicar nos botoes de filtro, filtra corretamente', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push(favoritePath);
    expect(history.location.pathname).toBe(favoritePath);

    const title = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(title).toBeInTheDocument();

    const allFilter = screen.getByRole('button', { name: /all/i });
    expect(allFilter).toBeInTheDocument();

    const foodFilter = screen.getByRole('button', { name: /meals/i });
    expect(foodFilter).toBeInTheDocument();

    const drinkFilter = screen.getByRole('button', { name: /drinks/i });
    expect(drinkFilter).toBeInTheDocument();

    const favoriteRecipes = screen.getAllByTestId(favoriteCardStr);
    expect(favoriteRecipes).toHaveLength(2);

    userEvent.click(foodFilter);
    const favoriteFoodRecipes = screen.getAllByTestId(favoriteCardStr);
    expect(favoriteFoodRecipes).toHaveLength(1);

    userEvent.click(drinkFilter);
    const favoriteDrinkRecipes = screen.getAllByTestId(favoriteCardStr);
    expect(favoriteDrinkRecipes).toHaveLength(1);

    userEvent.click(allFilter);
    const favoriteAllRecipes = screen.getAllByTestId(favoriteCardStr);
    expect(favoriteAllRecipes).toHaveLength(2);
  });

  test('Se clicar no botao de favorito, desfavorita a receita', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push(favoritePath);
    expect(history.location.pathname).toBe(favoritePath);

    const favoriteRecipes = screen.getAllByTestId(favoriteCardStr);
    expect(favoriteRecipes).toHaveLength(2);

    const favoriteBtn = screen.getAllByTestId(/horizontal-favorite-btn/i);
    expect(favoriteBtn).toHaveLength(2);

    userEvent.click(favoriteBtn[0]);
    const favoriteRecipesAfter = screen.getAllByTestId(favoriteCardStr);
    expect(favoriteRecipesAfter).toHaveLength(1);
  });
});

describe('FavoriteRecipes localStorage vazia', () => {
  test('Se nada aparece, caso o localStorage esteja vazio', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push(favoritePath);
    expect(history.location.pathname).toBe(favoritePath);

    const title = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(title).toBeInTheDocument();

    const allFilter = screen.getByRole('button', { name: /all/i });
    expect(allFilter).toBeInTheDocument();

    const foodFilter = screen.getByRole('button', { name: /meals/i });
    expect(foodFilter).toBeInTheDocument();

    const drinkFilter = screen.getByRole('button', { name: /drinks/i });
    expect(drinkFilter).toBeInTheDocument();

    const favoriteRecipes = screen.queryAllByTestId(favoriteCardStr);
    expect(favoriteRecipes).toHaveLength(0);
  });

  test('Se nada acontece caso o localStorage esteja vazio e clique nos botoes de filter', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push(favoritePath);
    expect(history.location.pathname).toBe(favoritePath);

    const title = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(title).toBeInTheDocument();

    const allFilter = screen.getByRole('button', { name: /all/i });
    expect(allFilter).toBeInTheDocument();

    const foodFilter = screen.getByRole('button', { name: /meals/i });
    expect(foodFilter).toBeInTheDocument();

    const drinkFilter = screen.getByRole('button', { name: /drinks/i });
    expect(drinkFilter).toBeInTheDocument();

    const favoriteRecipes = screen.queryAllByTestId(favoriteCardStr);
    expect(favoriteRecipes).toHaveLength(0);

    userEvent.click(foodFilter);
    const favoriteFoodRecipes = screen.queryAllByTestId(favoriteCardStr);
    expect(favoriteFoodRecipes).toHaveLength(0);

    userEvent.click(drinkFilter);
    const favoriteDrinkRecipes = screen.queryAllByTestId(favoriteCardStr);
    expect(favoriteDrinkRecipes).toHaveLength(0);

    userEvent.click(allFilter);
    const favoriteAllRecipes = screen.queryAllByTestId(favoriteCardStr);
    expect(favoriteAllRecipes).toHaveLength(0);
  });
});
