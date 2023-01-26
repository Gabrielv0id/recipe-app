import Header from '../components/Header';
import Recipes from './Recipes';

function Meals() {
  return (
    <section>
      <Header title="Meals" type="meals" profile search />
      <Recipes />
    </section>
  );
}

export default Meals;
