import React from 'react';
import { Link } from 'react-router-dom';
import { GiMeal } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import '../css/Footer.css';

function Footer() {
  return (
    <footer
      className="flex bottom-0 fixed w-[340px] justify-evenly bg-purple-800 p-1"
      data-testid="footer"
    >
      <Link to="/drinks">
        <BiDrink className="text-4xl text-yellow-400 m-auto ml-7" />
      </Link>
      <Link to="/meals">
        <GiMeal className="text-4xl text-yellow-400 m-auto mr-7" />
      </Link>
    </footer>
  );
}

export default Footer;
