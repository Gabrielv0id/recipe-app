import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import DataProvider from '../context/DataProvider';

describe('Testa o componente SearchBar e...', () => {
  beforeEach(() => {
    renderWithRouter(
      <DataProvider>
        <App />
      </DataProvider>,
    );

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
    const headerSearchButton = screen.getByTestId('search-top-btn');
    userEvent.click(headerSearchButton);

    const testText = 'chicken';
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');
    userEvent.type(searchInput, testText);
    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);
    userEvent.click(nameRadio);
    userEvent.click(searchButton);
    userEvent.click(firstLetterRadio);

    const spy = jest.spyOn(global, 'alert');
    userEvent.click(searchButton);
    expect(spy).toHaveBeenCalled();
  });
});
