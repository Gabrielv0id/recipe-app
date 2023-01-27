import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './utils/renderWithRouter';
import { mealMock } from './mocks/mockData';
import RecipeDetails from '../pages/RecipeDetails';

const spyFetch = jest.spyOn(global, 'fetch');
const path = '/meals/52771';

describe('RecipeDetails', () => {
  let history;
  beforeEach(async () => {
    spyFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealMock),
    });
    await act(async () => {
      const component = renderWithRouter(<RecipeDetails
        location={ { pathname: path } }
      />, [path]);
      history = component.history;
    });
  });

  it('verifica se esta na rota correta', () => {
    expect(history.location.pathname).toBe(path);
  });

  it('verifica se os elementos estão na tela', () => {
    const image = screen.getByTestId('recipe-photo');
    const title = screen.getByTestId('recipe-title');
    const category = screen.getByTestId('recipe-category');
    const ingredients = screen.getByTestId('0-ingredient-name-and-measure');
    const instructions = screen.getByTestId('instructions');
    const video = screen.getByTestId('video');

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(ingredients).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
  });

  it('se o botão de iniciar receita está na tela', () => {
    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();
  });
});
