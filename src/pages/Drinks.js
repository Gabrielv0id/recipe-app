import Header from '../components/Header';
import Recipes from './Recipes';

function Drinks() {
  return (
    <section>
      <Header title="Drinks" type="drinks" profile search />
      <Recipes />
    </section>
  );
}

export default Drinks;
