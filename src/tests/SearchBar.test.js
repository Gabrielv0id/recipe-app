import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import DataProvider from '../context/DataProvider';

const searchInputStr = 'search-input';
const searchTopBtnStr = 'search-top-btn';
const searchName = 'name-search-radio';
const searchBtn = 'exec-search-btn';

describe('Testa o componente SearchBar e...', () => {
  let history;
  beforeEach(() => {
    const component = renderWithRouter(
      <DataProvider>
        <App />
      </DataProvider>,
    );
    history = component.history;

    const email = 'trybe@gmail.com';
    const password = '1234567';

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    userEvent.click(loginButton);
  });
  test('verifica se o titulo da pagina é Meals', () => {
    const heading = screen.getByRole('heading', { name: /meals/i });
    expect(heading).toBeInTheDocument();
  });
  test('verifica se os radio buttons funcionam corretamente', () => {
    const headerSearchButton = screen.getByTestId(searchTopBtnStr);
    userEvent.click(headerSearchButton);

    const testText = 'chicken';

    const searchInput = screen.getByTestId(searchInputStr);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId(searchName);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId(searchBtn);
    userEvent.type(searchInput, testText);
    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);
    userEvent.click(nameRadio);
    userEvent.click(searchButton);
    userEvent.click(firstLetterRadio);

    const spy = jest.spyOn(global, 'alert');

    userEvent.click(searchButton);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  test('verifica se da mensagem de erro caso o que esta sendo procurado nao exista', async () => {
    const headerSearchButton = screen.getByTestId(searchTopBtnStr);
    userEvent.click(headerSearchButton);

    const errorText = 'xablau';

    const searchInput = screen.getByTestId(searchInputStr);
    const nameRadio = screen.getByTestId(searchName);
    const searchButton = screen.getByTestId(searchBtn);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, errorText);

    const spy = jest.spyOn(global, 'alert');

    await waitFor(() => {
      userEvent.click(searchButton);
      expect(spy).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });

  test('verifica se a busca por nome funciona corretamente', async () => {
    const headerSearchButton = screen.getByTestId(searchTopBtnStr);
    userEvent.click(headerSearchButton);

    const testText = 'chicken';

    const searchInput = screen.getByTestId(searchInputStr);
    const nameRadio = screen.getByTestId(searchName);
    const searchButton = screen.getByTestId(searchBtn);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, testText);

    await wait(async () => {
      userEvent.click(searchButton);
      expect(history.location.pathname).toBe('/meals');

      const mealCard = await screen.findByTestId('0-recipe-card');
      expect(mealCard).toBeInTheDocument();
    });
  });

  test('verifica se vai para pagina caso so uma receita', async () => {
    const headerSearchButton = screen.getByTestId(searchTopBtnStr);
    userEvent.click(headerSearchButton);

    const testText = 'Arrabiata';

    const searchInput = screen.getByTestId(searchInputStr);
    const nameRadio = screen.getByTestId(searchName);
    const searchButton = screen.getByTestId(searchBtn);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, testText);

    await waitFor(async () => {
      userEvent.click(searchButton);
      console.log(history.location.pathname);
      expect(history.location.pathname).toBe('/meals/52771');
    });
  });
});
