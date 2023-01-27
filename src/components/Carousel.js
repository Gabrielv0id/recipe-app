import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const MAXITEMS = 6;

function Carousel({ data }) {
  let items = data;
  if (data.length > MAXITEMS) items = data.slice(0, MAXITEMS);

  // Ref do elemento (.carousel-scroll)
  const ref = useRef();

  const handleScroll = () => {
    // Pega a div com a classe carousel-scroll
    const carousel = ref.current;
    // Pega todos os elementos com a classe snaps (filhos do carousel)
    const itemsDivs = Array.from(carousel.getElementsByClassName('snaps'));

    // Esconde todos os itens inicialmente
    itemsDivs.forEach((item) => {
      item.style.visibility = 'hidden';
    });

    // Pega a posição do carousel - https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    const viewport = carousel.getBoundingClientRect();

    // Check which items are in view
    itemsDivs.forEach((item) => {
      // Pega a posição do item (filho do carousel, no caso os snaps)
      const rect = item.getBoundingClientRect();
      // Verifica se o item está dentro do viewport, verificando o tamanho, como a viewport tem o tamanho total e
      // as imagens tem 50% do tamanho, isso garante que pelo menos duas imagens estejam totalmente visível
      // console.log(rect.left, viewport.left, rect.right, viewport.right); <- Ajuda a entender oq ta acontecendo.
      if (rect.left >= viewport.left && rect.right <= viewport.right) {
        // Se estiver visivel, mostra o item
        item.style.visibility = 'visible';
      }
    });
  };

  useEffect(() => {
    const carousel = ref.current;
    // De volta a JS, criando um eventListener para o evento scroll
    carousel.addEventListener('scroll', handleScroll);

    // Chama a função handleScroll para verificar se tem algum item visível, mesmo que o usuario não esteja scrollando
    const intervalId = setInterval(handleScroll, 100);

    // Limpa o intervalo e o eventListener
    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      clearInterval(intervalId);
    };
  }, [ref]);

  return (
    <div ref={ ref } className="carousel-scroll">
      {items.map((item, index) => (
        <div
          className="snaps"
          key={ item.idDrink || item.idMeal }
          data-testid={ `${index}-recommendation-card` }
        >
          <img
            src={ item.strDrinkThumb || item.strMealThumb }
            alt={ item.strDrink || item.strMeal }
          />
          <p
            data-testid={ `${index}-recommendation-title` }
          >
            { item.strDrink || item.strMeal }
          </p>
        </div>
      ))}
    </div>
  );
}

Carousel.defaultProps = {
  data: [],
};

Carousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

export default Carousel;
