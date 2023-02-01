import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import DataProvider from '../context/DataProvider';
import { mealMock } from './mocks/mockData';

const vegetarianBtnFilter = 'Vegetarian-category-filter';
const seafoodBtnFilter = 'Seafood-category-filter';
const recipeCardFilter = '0-recipe-card';
const recipeTitleFilter = '0-card-name';
const recipeImgFilter = '0-card-img';
const recipeCardFilter2 = '1-recipe-card';
const recipeTitleFilter2 = '1-card-name';
const recipeImgFilter2 = '1-card-img';

const spyFetch = jest.spyOn(global, 'fetch');

describe('Testa a tela principal', () => {
  let history;
  beforeEach(() => {
    act(() => {
      spyFetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mealMock),
      });
      const component = renderWithRouter(
        <DataProvider>
          <App />
        </DataProvider>,
      );
      history = component.history;
    });

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

  test('se a rota que esta atualmente', () => {
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });

  test('se todos os botoes da tela principal estao presentes e os cards', async () => {
    await waitFor(() => {
      const vegetarianBtn = screen.getByTestId(vegetarianBtnFilter);
      const seafoodBtn = screen.getByTestId(seafoodBtnFilter);
      const card = screen.getByTestId(recipeCardFilter);
      const cardImg = screen.getByTestId(recipeImgFilter);
      const cardTitle = screen.getByTestId(recipeTitleFilter);
      const card2 = screen.getByTestId(recipeCardFilter2);
      const cardImg2 = screen.getByTestId(recipeImgFilter2);
      const cardTitle2 = screen.getByTestId(recipeTitleFilter2);

      expect(vegetarianBtn).toBeInTheDocument();
      expect(seafoodBtn).toBeInTheDocument();
      expect(card).toBeInTheDocument();
      expect(cardImg).toBeInTheDocument();
      expect(cardTitle).toBeInTheDocument();
      expect(card2).toBeInTheDocument();
      expect(cardImg2).toBeInTheDocument();
      expect(cardTitle2).toBeInTheDocument();
    });
  });

  test('se clicar no botão de categoria vegetariana, vegetarian continua', async () => {
    await waitFor(async () => {
      const vegetarianBtn = screen.getByTestId(vegetarianBtnFilter);
      const card = screen.getByTestId(recipeCardFilter);
      const cardImg = screen.getByTestId(recipeImgFilter);
      const cardTitle = screen.getByTestId(recipeTitleFilter);

      act(() => userEvent.click(vegetarianBtn));

      expect(card).toBeInTheDocument();
      expect(cardImg).toBeInTheDocument();
      expect(cardTitle).toBeInTheDocument();
    });
  });

  test('se clicar no botao de seafood, seafood continua', async () => {
    await waitFor(async () => {
      const seafoodBtn = screen.getByTestId(seafoodBtnFilter);
      const card = screen.getByTestId(recipeCardFilter);
      const cardImg = screen.getByTestId(recipeImgFilter);
      const cardTitle = screen.getByTestId(recipeTitleFilter);

      act(() => userEvent.click(seafoodBtn));

      expect(card).toBeInTheDocument();
      expect(cardImg).toBeInTheDocument();
      expect(cardTitle).toBeInTheDocument();
    });
  });

  test('se, ao clicar no all, continua mostrando tudo', async () => {
    await waitFor(async () => {
      const allBtn = screen.getByTestId('All-category-filter');
      const card = screen.getByTestId(recipeCardFilter);
      const cardImg = screen.getByTestId(recipeImgFilter);
      const cardTitle = screen.getByTestId(recipeTitleFilter);
      const card2 = screen.getByTestId(recipeCardFilter2);
      const cardImg2 = screen.getByTestId(recipeImgFilter2);
      const cardTitle2 = screen.getByTestId(recipeTitleFilter2);

      act(() => userEvent.click(allBtn));

      expect(card).toBeInTheDocument();
      expect(cardImg).toBeInTheDocument();
      expect(cardTitle).toBeInTheDocument();
      expect(card2).toBeInTheDocument();
      expect(cardImg2).toBeInTheDocument();
      expect(cardTitle2).toBeInTheDocument();
    });
  });

  test('se clicar no card, vai para a pagina de detalhes', async () => {
    await waitFor(async () => {
      const card = screen.getByTestId(recipeCardFilter);

      act(() => userEvent.click(card));
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52771');
  });
});
