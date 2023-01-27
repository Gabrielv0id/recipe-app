import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from './Recipes';

function Drinks() {
  return (
    <section>
      <Header title="Drinks" type="drinks" profile search />
      <Recipes />
      <Footer />
    </section>
  );
}

export default Drinks;
