import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste do Perfil', () => {
  it('Testando Botões.', () => {
    const { renderProfile } = renderWithRouter(<Profile />);
    const { history } = renderProfile.location;

    const profileLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(profileLogout);
    expect(localStorage).clear();
    expect(history).toBe('/');

    const profileDone = screen.getByTestId('profile-done-btn');
    expect(profileDone).toBeInTheDocument();
    userEvent.click(profileDone);
    expect(history).toBe('/done-recipes');

    const profileFavorite = screen.getByTestId('profile-favorite-btn');
    expect(profileFavorite).toBeInTheDocument();

    userEvent.click(profileFavorite);
    expect(history).toBe('/favorite-recipes');
  });
});
