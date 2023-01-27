import React from 'react';
import { screen } from '@testing-library/react';
import Footer from '../components/Footer';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando Footer', () => {
  test('Se Reederiza tudo', () => {
    renderWithRouter(<Footer />);
    const meal = screen.getByRole('img', {
      name: /meals icon/i,
    });
    const drink = screen.getByRole('img', {
      name: /drinks icon/i,
    });
    expect(meal).toBeInTheDocument();
    expect(drink).toBeInTheDocument();
  });
});
