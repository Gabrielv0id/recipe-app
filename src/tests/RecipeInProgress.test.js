import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './utils/renderWithRouter';
import { mealMock } from './mocks/mockData';
import DataProvider from '../context/DataProvider';
import RecipeInProgress from '../components/RecipeInProgress';

const spyFetch = jest.spyOn(global, 'fetch');
const mealPath = '/meals/52771/in-progress';
const whiteHeartIcon = 'http://localhost/whiteHeartIcon.svg';
const blackHeartIcon = 'http://localhost/blackHeartIcon.svg';

describe('RecipeInProgress mealPath', () => {
  let history;
  let rerender;
  beforeEach(async () => {
    spyFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealMock),
    });
    await act(async () => {
      const component = renderWithRouter(
        <DataProvider>
          <RecipeInProgress location={ { pathname: mealPath } } />
        </DataProvider>,
        [mealPath],
      );
      history = component.history;
      rerender = component.rerender;
    });
  });

  test('Se comeca na rota correta', () => {
    expect(history.location.pathname).toBe(mealPath);
  });

  test('Se os elementos estão na tela', () => {
    const title = screen.getByText(/spicy arrabiata penne/i);
    const image = screen.getByAltText(/spicy arrabiata penne/i);
    const category = screen.getByText(/Vegetarian/i);
    const instructions = screen.getByText(/Bring a large pot of lightly salted water to a boil./i);
    const ingredients = screen.getAllByTestId(/ingredient-step/i);

    expect(title).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(ingredients).toHaveLength(3);
  });

  test('Se os botões estão na tela e se o finishRecipe esta desabilitado', () => {
    const shareBtn = screen.getByTestId(/share-btn/i);
    const favoriteBtn = screen.getByTestId(/favorite-btn/i);
    const finishRecipe = screen.getByTestId(/finish-recipe-btn/i);

    expect(finishRecipe).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(finishRecipe).toBeDisabled();
  });

  test('Se o botão de favoritar funciona', () => {
    const favoriteBtn = screen.getByTestId(/favorite-btn/i);
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveProperty('src', whiteHeartIcon);

    act(() => {
      userEvent.click(favoriteBtn);
    });

    expect(favoriteBtn).toHaveProperty('src', blackHeartIcon);

    act(() => {
      rerender(
        <DataProvider>
          <RecipeInProgress location={ { pathname: mealPath } } />
        </DataProvider>,
      );
    });

    expect(favoriteBtn).toHaveProperty('src', blackHeartIcon);
  });

  test('Se remove dos favoritos', () => {
    const favoriteBtn = screen.getByTestId(/favorite-btn/i);
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveProperty('src', whiteHeartIcon);

    act(() => {
      userEvent.click(favoriteBtn);
    });

    expect(favoriteBtn).toHaveProperty('src', blackHeartIcon);

    act(() => {
      userEvent.click(favoriteBtn);
    });

    expect(favoriteBtn).toHaveProperty('src', whiteHeartIcon);
  });

  test('se copia corretamente', async () => {
    const mockedWriteText = jest.fn();

    navigator.clipboard = {
      writeText: mockedWriteText,
    };

    const shareBtn = screen.getByRole('button', { name: 'share' });
    act(() => userEvent.click(shareBtn));

    await waitFor(() => expect(screen.getByText('Link copied!')).toBeInTheDocument());
  });

  test('Se o botão de finalizar a receita está habilitado apos marcar todos os checkboxes', () => {
    const finishRecipe = screen.getByTestId(/finish-recipe-btn/i);
    const checkbox = screen.getAllByTestId(/ingredient-step/i);

    expect(finishRecipe).toBeDisabled();

    act(() => {
      userEvent.click(checkbox[0]);
      userEvent.click(checkbox[1]);
      userEvent.click(checkbox[2]);
    });

    expect(finishRecipe).toBeEnabled();

    act(() => {
      userEvent.click(checkbox[0]);
    });

    expect(finishRecipe).toBeDisabled();

    act(() => {
      userEvent.click(checkbox[0]);
    });

    expect(finishRecipe).toBeEnabled();
  });

  test('Se apos clicar no botao de finalizar, o usuario é redirecionado para a tela de receitas feitas', () => {
    const finishRecipe = screen.getByTestId(/finish-recipe-btn/i);

    expect(finishRecipe).toBeEnabled();

    act(() => {
      userEvent.click(finishRecipe);
    });

    expect(history.location.pathname).toBe('/done-recipes');
  });
});
