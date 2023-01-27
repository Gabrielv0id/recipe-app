import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Testando Footer', () => {
  test('Se Reederiza tudo', () => {
    render(<Footer />);
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
