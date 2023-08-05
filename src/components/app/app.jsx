import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { API_URL } from '../../utils/constants';
import styles from './app.module.css';

function App() {
  const [apiData, setApiData] = useState([]);
  const [activeModal, setActiveModal] = useState('');
  const [modalData, setModalData] = useState(null);

  // TODO: isLoading, isError

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(API_URL);
        if(!res.ok) {
          throw Error(res.statusText);
        }
        const {success, data: apiData} = await res.json();
        // TODO: check success === true ??
        setApiData(apiData);
      } catch(error) {
        console.log(error);
      };
    })();
  }, []);

  const showModal = (modalName, modalData) => {
    setModalData(modalData);
    setActiveModal(modalName);
  }

  const hideModal = () => {
    setActiveModal('');
  }

  return (
    <>
      <AppHeader />
      <main className={`${styles.appMain} pl-5 pr-5`}>
        {!!apiData.length &&
          <>
            <BurgerIngredients dataList={apiData} showModal={showModal} />
            <BurgerConstructor dataList={apiData} showModal={showModal} />
            {
              activeModal === 'ingredient' && (
              <Modal hideModal={hideModal} modalHeaderText="Детали ингредиента">
                <IngredientDetails dataItem={modalData} />
              </Modal>
            )}
            {
              activeModal === 'order' && (
              <Modal hideModal={hideModal}>
                <OrderDetails />
              </Modal>
            )}
          </>
        }
      </main>
    </>
  );
}

export default App;
