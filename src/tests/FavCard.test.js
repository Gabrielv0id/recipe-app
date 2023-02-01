import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import FavCard from '../components/FavCard';
import renderWithRouter from './utils/renderWithRouter';

describe('FavCard component', () => {
  const mockHandleUnfavorite = jest.fn();
  const mockRecipe = {
    id: '12345',
    type: 'drink',
    category: 'alcoholic',
    alcoholicOrNot: 'alcoholic',
    name: 'Mojito',
    image: 'mojito.jpg',
    nationality: 'Cuban',
  };

  it('Renderiza o component', () => {
    renderWithRouter(<FavCard
      index={ 0 }
      recipe={ mockRecipe }
      handleUnfavorite={ mockHandleUnfavorite }
    />);

    const link = screen.getByRole('link', { name: 'Mojito Mojito' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/${mockRecipe.type}s/${mockRecipe.id}`);

    const image = screen.getByAltText(mockRecipe.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockRecipe.image);

    const text = screen.getByText(`${mockRecipe.alcoholicOrNot}`);
    expect(text).toBeInTheDocument();

    const shareBtn = screen.getByRole('button', { name: 'share' });
    expect(shareBtn).toBeInTheDocument();

    const unfavoriteBtn = screen.getByRole('button', { name: 'unfavorite' });
    expect(unfavoriteBtn).toBeInTheDocument();
  });

  it('se copia corretamente', async () => {
    const mockedWriteText = jest.fn();

    navigator.clipboard = {
      writeText: mockedWriteText,
    };

    renderWithRouter(<FavCard
      index={ 0 }
      recipe={ mockRecipe }
      handleUnfavorite={ mockHandleUnfavorite }
    />);

    const shareBtn = screen.getByRole('button', { name: 'share' });

    act(() => userEvent.click(shareBtn));

    await waitFor(() => expect(screen.getByText('Link copied!')).toBeInTheDocument());
  });

  it('se remove dos favoritos', () => {
    renderWithRouter(<FavCard
      index={ 0 }
      recipe={ mockRecipe }
      handleUnfavorite={ mockHandleUnfavorite }
    />);

    const unfavoriteBtn = screen.getByRole('button', { name: 'unfavorite' });

    act(() => userEvent.click(unfavoriteBtn));

    expect(mockHandleUnfavorite).toHaveBeenCalledWith(mockRecipe.id);
  });
});
