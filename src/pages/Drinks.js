import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import MainPageButtons from '../components/MainPageButtons';

function Drinks() {
  return (
    <section>
      <Header title="Drinks" type="drinks" profile search />
      <MainPageButtons type="drinks" />
      <Recipes type="drinks" />
      <Footer />
    </section>
  );
}

export default Drinks;
