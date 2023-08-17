import { useDispatch, useSelector } from 'react-redux';
import { resetIngredientData, isNotEmptyIngredientData } from '../../services/slices/ingredient-details';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const apiDataStatus = useSelector(state => state.burgerIngredients.status); // TODO: isLoading
  const errorMessage = useSelector(state => state.burgerIngredients.error); // TODO: isError
  const showModalIngredientDetails = useSelector(isNotEmptyIngredientData);

  return (
    <>
      <AppHeader />
      <main className={`${styles.appMain} pl-5 pr-5`}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      {showModalIngredientDetails && (
        <Modal hideModal={() => dispatch(resetIngredientData())} modalHeaderText="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
