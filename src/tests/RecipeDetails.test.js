import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { wait } from '@testing-library/user-event/dist/utils';
import renderWithRouter from './utils/renderWithRouter';
import { mealMock, drinkMock } from './mocks/mockData';
import RecipeDetails from '../pages/RecipeDetails';

const spyFetch = jest.spyOn(global, 'fetch');
const mealPath = '/meals/52771';
const drinkPath = '/drinks/178319';
const startRecipeStr = 'start-recipe-btn';
const favoriteBtnStr = 'favorite-btn';
const whiteHeartIcon = 'http://localhost/whiteHeartIcon.svg';
const blackHeartIcon = 'http://localhost/blackHeartIcon.svg';

describe('RecipeDetails', () => {
  let history;
  let rerender;
  beforeEach(async () => {
    spyFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealMock),
    });
    await act(async () => {
      const component = renderWithRouter(<RecipeDetails
        location={ { pathname: mealPath } }
      />, [mealPath]);
      history = component.history;
      rerender = component.rerender;
    });
  });

  test('se esta na rota correta', () => {
    expect(history.location.pathname).toBe(mealPath);
  });

  test('se os elementos estão na tela', () => {
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

  test('se o botão de iniciar receita está na tela e, ao clicar, muda para continue', () => {
    const startRecipeBtn = screen.getByTestId(startRecipeStr);
    expect(startRecipeBtn).toBeInTheDocument();
    expect(startRecipeBtn).toHaveTextContent('Start Recipe');

    act(() => {
      userEvent.click(startRecipeBtn);
    });

    expect(startRecipeBtn).toHaveTextContent('Continue Recipe');
  });

  test('se o botão de favoritar está na tela, se ao clicar, muda para favoritado e se atualizar a pagina, continua favorito', () => {
    const favoriteBtn = screen.getByTestId(favoriteBtnStr);
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveProperty('src', whiteHeartIcon);

    act(() => {
      userEvent.click(favoriteBtn);
    });

    expect(favoriteBtn).toHaveProperty('src', blackHeartIcon);

    act(() => {
      rerender(<RecipeDetails
        location={ { pathname: mealPath } }
      />);
    });

    expect(favoriteBtn).toHaveProperty('src', blackHeartIcon);
  });

  test('se consegue favoritar e desfavoritar o item', () => {
    const favoriteBtn = screen.getByTestId(favoriteBtnStr);
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

  test('se o botão de compartilhar está na tela e, ao clicar, aparece o "Link Copied!"', async () => {
    const mockedWriteText = jest.fn();

    navigator.clipboard = {
      writeText: mockedWriteText,
    };
    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(shareBtn);
    });

    await wait(async () => {
      const linkCopied = await screen.findByText('Link Copied!');
      expect(linkCopied).toBeInTheDocument();
      expect(mockedWriteText).toBeCalledWith('http://localhost/meals/52771');
    }, { timeout: 1000 });
  });

  test('se ao clicar no botão de iniciar receita, muda para a rota correta', () => {
    const startRecipeBtn = screen.getByTestId(startRecipeStr);

    act(() => {
      userEvent.click(startRecipeBtn);
    });

    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });
});

describe('RecipeDetails Drinks', () => {
  let history;
  let rerender;
  beforeEach(async () => {
    spyFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkMock),
    });
    await act(async () => {
      const component = renderWithRouter(<RecipeDetails
        location={ { pathname: drinkPath } }
      />, [drinkPath]);
      history = component.history;
      rerender = component.rerender;
    });
  });

  test('se esta na rota correta', () => {
    expect(history.location.pathname).toBe(drinkPath);
  });

  test('se os elementos estão na tela', () => {
    const image = screen.getByTestId('recipe-photo');
    const title = screen.getByTestId('recipe-title');
    const category = screen.getByTestId('recipe-category');
    const ingredients = screen.getByTestId('0-ingredient-name-and-measure');
    const instructions = screen.getByTestId('instructions');

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(ingredients).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
  });

  test('se o botão de iniciar receita está na tela e, ao clicar, muda para continue', () => {
    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();
    expect(startRecipeBtn).toHaveTextContent('Start Recipe');

    act(() => {
      userEvent.click(startRecipeBtn);
    });

    expect(startRecipeBtn).toHaveTextContent('Continue Recipe');
  });

  test('se o botão de favoritar está na tela e, ao clicar, muda para favoritado e, se clicar novamente, remove', () => {
    const favoriteBtn = screen.getByTestId(favoriteBtnStr);
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

    act(() => {
      userEvent.click(favoriteBtn);
    });

    act(() => {
      rerender(<RecipeDetails
        location={ { pathname: drinkPath } }
      />);
    });

    expect(favoriteBtn).toHaveProperty('src', blackHeartIcon);
  });

  test('se o botão de compartilhar está na tela e, ao clicar, aparece o "Link Copied!"', async () => {
    const mockedWriteText = jest.fn();

    navigator.clipboard = {
      writeText: mockedWriteText,
    };
    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(shareBtn);
    });

    await wait(async () => {
      const linkCopied = await screen.findByText('Link Copied!');
      expect(linkCopied).toBeInTheDocument();
      expect(mockedWriteText).toBeCalledWith('http://localhost/drinks/178319');
    }, { timeout: 1000 });
  });

  test('se ao clicar no botão de iniciar receita, muda para a rota correta', () => {
    const startRecipeBtn = screen.getByTestId(startRecipeStr);

    act(() => {
      userEvent.click(startRecipeBtn);
    });

    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });
});
