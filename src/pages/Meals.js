import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import MainPageButtons from '../components/MainPageButtons';

function Meals() {
  return (
    <section>
      <Header title="Meals" type="meals" page="meal" profile search />
      <MainPageButtons type="meals" />
      <Recipes type="meals" />
      <Footer />
    </section>
  );
}

export default Meals;
