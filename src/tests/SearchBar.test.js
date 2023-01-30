import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import DataProvider from '../context/DataProvider';
import { drinkMock, mealMock } from './mocks/mockData';

const searchInputStr = 'search-input';
const searchTopBtnStr = 'search-top-btn';
const searchName = 'name-search-radio';
const searchBtn = 'exec-search-btn';

const spyFetch = jest.spyOn(global, 'fetch');

describe('Testa o componente SearchBar e...', () => {
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

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    userEvent.click(loginButton);
  });
  test('verifica se o titulo da pagina é Meals', async () => {
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

    const testText = 'Corba';

    const searchInput = screen.getByTestId(searchInputStr);
    const nameRadio = screen.getByTestId(searchName);
    const searchButton = screen.getByTestId(searchBtn);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, testText);

    await wait(async () => {
      userEvent.click(searchButton);
      expect(history.location.pathname).toBe('/comidas/52977');
    });
  });
});

describe('Testa o componente SearchBar e com drinks', () => {
  let history;
  beforeEach(() => {
    act(() => {
      spyFetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinkMock),
      });
      const component = renderWithRouter(
        <DataProvider>
          <App />
        </DataProvider>,
      );
      history = component.history;
    });
    act(() => {
      history.push('/drinks');
    });
  });
  test('verifica se o titulo da pagina é Meals', async () => {
    const heading = screen.getByRole('heading', { name: /drinks/i });
    expect(heading).toBeInTheDocument();
  });

  test('verifica se a busca por nome funciona corretamente', async () => {
    const headerSearchButton = screen.getByTestId(searchTopBtnStr);
    userEvent.click(headerSearchButton);

    const testText = 'aquamarine';

    const searchInput = screen.getByTestId(searchInputStr);
    const nameRadio = screen.getByTestId(searchName);
    const searchButton = screen.getByTestId(searchBtn);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, testText);

    await waitFor(async () => {
      userEvent.click(searchButton);
      expect(history.location.pathname).toBe('/drinks');

      const mealCard = await screen.findByTestId('0-recipe-card');
      expect(mealCard).toBeInTheDocument();
    });
  });
});

describe('Testa o componente SearchBar isoladamente', () => {
  test('Se o alert aparece quando não há elementos retornados pelo fetch', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: [] }),
    });
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(
      <DataProvider>
        <App />
      </DataProvider>,
    );
    act(() => {
      history.push('/drinks');
    });

    const searchBtnIsolated = screen.getByTestId(searchTopBtnStr);
    act(() => {
      userEvent.click(searchBtnIsolated);
    });

    const searchButton = screen.getByTestId(searchBtn);
    act(() => {
      userEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(spyAlert).toHaveBeenCalled();
    });
  });

  test('Se redireciona para a página de detalhes do item se houver somente um item na lista', async () => {
    const fetchIsolatedSpy = jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: [{ idDrink: '1' }] }),
    });

    const { history } = renderWithRouter(
      <DataProvider>
        <App />
      </DataProvider>,
    );
    act(() => {
      history.push('/drinks');
    });

    const searchBtnIsolated = screen.getByTestId(searchTopBtnStr);

    act(() => {
      userEvent.click(searchBtnIsolated);
    });

    const nameRadio = screen.getByTestId(searchName);
    const searchButton = screen.getByTestId(searchBtn);

    act(() => {
      userEvent.click(nameRadio);
      userEvent.click(searchButton);
    });

    await waitFor(async () => {
      expect(fetchIsolatedSpy).toHaveBeenCalled();
      expect(history.location.pathname).toBe('/drinks/1');
    });
  });

  test('Se respeita o limite de 12 itens', async () => {
    const fetchIsolatedSpy = jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [
          { idDrink: '1' },
          { idDrink: '2' },
          { idDrink: '3' },
          { idDrink: '4' },
          { idDrink: '5' },
          { idDrink: '6' },
          { idDrink: '7' },
          { idDrink: '8' },
          { idDrink: '9' },
          { idDrink: '10' },
          { idDrink: '11' },
          { idDrink: '12' },
          { idDrink: '13' },
        ],
      }),
    });

    const { history } = renderWithRouter(
      <DataProvider>
        <App />
      </DataProvider>,
    );
    act(() => {
      history.push('/drinks');
    });

    const searchBtnIsolated = screen.getByTestId(searchTopBtnStr);

    act(() => {
      userEvent.click(searchBtnIsolated);
    });

    const nameRadio = screen.getByTestId(searchName);
    const searchButton = screen.getByTestId(searchBtn);

    act(() => {
      userEvent.click(nameRadio);
      userEvent.click(searchButton);
    });

    expect(fetchIsolatedSpy).toHaveBeenCalled();
    await new Promise((res) => { setTimeout(res, 100); });
    expect(history.location.pathname).toBe('/drinks');
    expect(screen.getAllByTestId(/recipe-card/).length).toBe(12);
  });
});
