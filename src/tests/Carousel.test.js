import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Carousel from '../components/Carousel';

const MAXITEMS = 6;
const LIMITPLUS = 7;

describe('Carousel drinks', () => {
  const items = [
    { idDrink: '123', strDrink: 'Drink 1', strDrinkThumb: 'drink1.jpg' },
    { idDrink: '456', strDrink: 'Drink 2', strDrinkThumb: 'drink2.jpg' },
    { idDrink: '789', strDrink: 'Drink 3', strDrinkThumb: 'drink3.jpg' },
  ];

  test('se o Carousel é renderizado', () => {
    const { container } = render(<Carousel data={ items } />);
    expect(container).toBeInTheDocument();
  });

  test('se somente 6 itens sao renderizados', () => {
    const { container } = render(
      <Carousel
        data={
          [...Array(LIMITPLUS)].map((_, i) => (
            { idDrink: i, strDrink: `Drink ${i}`, strDrinkThumb: 'drink.jpg' }
          ))
        }
      />,
    );

    const snaps = container.querySelectorAll('.snaps');

    expect(snaps).toHaveLength(MAXITEMS);
  });

  test('se os itens mudam a visibilidade conforme scroll', () => {
    const { container } = render(<Carousel data={ items } />);
    const carousel = container.querySelector('.carousel-scroll');

    expect(screen.getByTestId(/0-recommendation-card/i).style.visibility).toBe('');
    expect(screen.getByTestId(/1-recommendation-card/i).style.visibility).toBe('');
    expect(screen.getByTestId(/2-recommendation-card/i).style.visibility).toBe('');

    fireEvent.scroll(carousel, { target: { scrollLeft: carousel.scrollWidth } });
    expect(screen.getByTestId(/0-recommendation-card/i).style.visibility).toBe('visible');
    expect(screen.getByTestId(/1-recommendation-card/i).style.visibility).toBe('visible');
    expect(screen.getByTestId(/2-recommendation-card/i).style.visibility).toBe('visible');
  });

  test('se os nomes estao corretos', () => {
    render(<Carousel data={ items } />);
    expect(screen.getByTestId(/0-recommendation-title/i).textContent).toBe('Drink 1');
    expect(screen.getByTestId(/1-recommendation-title/i).textContent).toBe('Drink 2');
    expect(screen.getByTestId(/2-recommendation-title/i).textContent).toBe('Drink 3');
  });
});

describe('Carousel meals', () => {
  const items = [
    { idMeal: '123', strMeal: 'Meal 1', strMealThumb: 'meal1.jpg' },
    { idMeal: '456', strMeal: 'Meal 2', strMealThumb: 'meal2.jpg' },
    { idMeal: '789', strMeal: 'Meal 3', strMealThumb: 'meal3.jpg' },
  ];

  test('se o Carousel é renderizado', () => {
    const { container } = render(<Carousel data={ items } />);
    expect(container).toBeInTheDocument();
  });

  test('se somente 6 itens sao renderizados', () => {
    const { container } = render(
      <Carousel
        data={
          [...Array(LIMITPLUS)].map((_, i) => (
            { idMeal: i, strMeal: `Meal ${i}`, strMealThumb: 'meal.jpg' }
          ))
        }
      />,
    );

    const snaps = container.querySelectorAll('.snaps');

    expect(snaps).toHaveLength(MAXITEMS);
  });

  test('se os itens mudam a visibilidade conforme scroll', () => {
    const { container } = render(<Carousel data={ items } />);
    const carousel = container.querySelector('.carousel-scroll');

    expect(screen.getByTestId(/0-recommendation-card/i).style.visibility).toBe('');
    expect(screen.getByTestId(/1-recommendation-card/i).style.visibility).toBe('');
    expect(screen.getByTestId(/2-recommendation-card/i).style.visibility).toBe('');

    fireEvent.scroll(carousel, { target: { scrollLeft: carousel.scrollWidth } });
    expect(screen.getByTestId(/0-recommendation-card/i).style.visibility).toBe('visible');
    expect(screen.getByTestId(/1-recommendation-card/i).style.visibility).toBe('visible');
    expect(screen.getByTestId(/2-recommendation-card/i).style.visibility).toBe('visible');
  });

  test('se os nomes estao corretos', () => {
    render(<Carousel data={ items } />);
    expect(screen.getByTestId(/0-recommendation-title/i).textContent).toBe('Meal 1');
    expect(screen.getByTestId(/1-recommendation-title/i).textContent).toBe('Meal 2');
    expect(screen.getByTestId(/2-recommendation-title/i).textContent).toBe('Meal 3');
  });
});
