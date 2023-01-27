import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../css/Footer.css';

function Footer() {
  return (
    <div
      className="footer"
      data-testid="footer"
    >
      <Link to="/meals">
        <img src={ mealIcon } alt="Meals icon" data-testid="meals-bottom-btn" />
      </Link>
      <Link to="/drinks">
        <img src={ drinkIcon } alt="Drinks icon" data-testid="drinks-bottom-btn" />
      </Link>

    </div>
  );
}

export default Footer;
