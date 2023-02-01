import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './utils/renderWithRouter';
import { doneMock } from './mocks/mockData';
import DoneRecipes from '../pages/DoneRecipes';

describe('DoneRecipes', () => {
  beforeEach(() => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneMock));
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  test('se a página contém os títulos corretos', () => {
    renderWithRouter(<DoneRecipes />);

    const title = screen.getByRole('heading', { level: 1, name: /done recipes/i });

    expect(title).toBeInTheDocument();
  });

  test('se a página contém todos os cards de receitas feitas', () => {
    renderWithRouter(<DoneRecipes />);

    const cards = screen.getAllByTestId(/favorite-card/i);

    expect(cards.length).toBe(2);
  });

  test('se clicar nos filtros, filtram as receitas', () => {
    renderWithRouter(<DoneRecipes />);

    const allFilter = screen.getByTestId(/filter-by-all-btn/i);
    const foodFilter = screen.getByTestId(/filter-by-meal-btn/i);
    const drinkFilter = screen.getByTestId(/filter-by-drink-btn/i);

    const allCards = screen.getAllByTestId(/favorite-card/i);
    expect(allCards.length).toBe(2);

    act(() => userEvent.click(foodFilter));

    const foodCards = screen.getAllByTestId(/favorite-card/i);
    expect(foodCards.length).toBe(1);

    act(() => userEvent.click(drinkFilter));

    const drinkCards = screen.getAllByTestId(/favorite-card/i);
    expect(drinkCards.length).toBe(1);

    act(() => userEvent.click(allFilter));

    const allCardsAgain = screen.getAllByTestId(/favorite-card/i);
    expect(allCardsAgain.length).toBe(2);
  });
});

describe('DoneRecipes sem localStorage', () => {
  test('Se não aparece nada, qnd o localStorage estiver vazio', () => {
    renderWithRouter(<DoneRecipes />);

    const allFilter = screen.getByTestId(/filter-by-all-btn/i);
    const foodFilter = screen.getByTestId(/filter-by-meal-btn/i);
    const drinkFilter = screen.getByTestId(/filter-by-drink-btn/i);

    const allCards = screen.queryAllByTestId(/favorite-card/i);
    expect(allCards.length).toBe(0);

    act(() => userEvent.click(foodFilter));

    const foodCards = screen.queryAllByTestId(/favorite-card/i);
    expect(foodCards.length).toBe(0);

    act(() => userEvent.click(drinkFilter));

    const drinkCards = screen.queryAllByTestId(/favorite-card/i);
    expect(drinkCards.length).toBe(0);

    act(() => userEvent.click(allFilter));

    const allCardsAgain = screen.queryAllByTestId(/favorite-card/i);
    expect(allCardsAgain.length).toBe(0);
  });
});
