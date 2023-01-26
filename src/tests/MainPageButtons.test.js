import React from 'react';
import { screen /* waitFor */ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import DataProvider from '../context/DataProvider';

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
  test('verifica se ao clicar em um botao de filtragem ele funciona normalmente', () => {
    const filterButton = screen.getByTestId('beef-category-filter');
    console.log(filterButton);

    userEvent.click(filterButton);

    const firstRecipe = screen.getByTestId('0-recipe-card');
    const firstRecipeName = screen.getByRole('heading', {
      name: /beef and mustard pie/i,
    });

    expect(firstRecipe).toBeInTheDocument();
    expect(firstRecipeName).toBeInTheDocument();
  });
  test('verifica se ao clicar no card de receita muda para outra pagina', () => {
    const firstRecipe = screen.getByTestId('0-recipe-card');

    userEvent.click(firstRecipe);

    expect(history.location.pathname).toBe('/meals/52977');
  });
});
