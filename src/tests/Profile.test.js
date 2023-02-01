import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Profile from '../pages/Profile';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando storage da pagina perfil', () => {
  beforeEach(() => {
    window.localStorage.setItem('user', JSON.stringify({ email: 'trybe@test.com' }));
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  test('Se o email do usuário estiver no localStorage, deve aparecer na tela', () => {
    const { history } = renderWithRouter(<Profile />);

    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    expect(profileEmail).toHaveTextContent('trybe@test.com');

    const profileLogout = screen.getByTestId('profile-logout-btn');
    act(() => userEvent.click(profileLogout));
    expect(history.location.pathname).toBe('/');
  });

  test('Se o email do usuário não estiver no localStorage, deve ser redirecionado para a tela de login', () => {
    window.localStorage.clear();
    const { history } = renderWithRouter(<Profile />);

    expect(history.location.pathname).toBe('/');
  });
});
