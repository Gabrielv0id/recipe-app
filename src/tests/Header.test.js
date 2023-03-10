import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import DataProvider from '../context/DataProvider';

describe('Testes do component Header', () => {
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

    act(() => {
      userEvent.type(emailInput, email);
      userEvent.type(passwordInput, password);
      userEvent.click(loginButton);
    });
  });

  test('se o titulo da pagina é Meals', () => {
    const heading = screen.getByRole('heading', { name: /meals/i });
    expect(heading).toBeInTheDocument();
  });

  test('se o botão de perfil esta na tela e se ao clicar, vai para o "/profile"', () => {
    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();

    act(() => userEvent.click(profileButton));
    expect(history.location.pathname).toBe('/profile');
  });

  test('se o botão de busca esta na tela e se ao clicar, aparece a barra de busca', () => {
    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();

    act(() => userEvent.click(searchButton));
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
