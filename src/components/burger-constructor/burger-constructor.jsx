import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { addIngredient, burgerConstructorTotalPrice } from '../../services/slices/burger-constructor';
import { orderRequest } from '../../services/slices/order';
import { emptyConstructor } from '../../services/slices/burger-constructor';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Price from '../price/price';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { LOGIN_URL } from '../../utils/constants';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [showOrderModal, setShowOrderModal] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  const bun = useSelector(state => state.burgerConstructor.bun);
  const filling = useSelector(state => state.burgerConstructor.filling);
  const price = useSelector(burgerConstructorTotalPrice);

  const [{isHover}, dropRef] = useDrop({
    accept: 'ingredientsItem',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      dispatch(addIngredient(item));
    },
  });

  const handleOrder = () => {
    if(user) {
      dispatch(orderRequest([
        bun._id,
        ...filling.map(item => item._id),
        bun._id,
      ]));
      setShowOrderModal(true);
    } else {
      navigate(LOGIN_URL);
    }
  };

  const hideModal = () => {
    setShowOrderModal(false);
    dispatch(emptyConstructor());
  };

  return (
    <>
      <section className={`${styles.burgerConstructor} ${isHover && styles.burgerConstructorDndHover} pt-25 pl-4`} ref={dropRef}>
        {bun && <BurgerConstructorItem constructorItem={bun} type='top' />}
        <section className={`${styles.burgerConstructorWrap} custom-scroll`}>
          {filling.map((item, index) => {
            return <BurgerConstructorItem key={item.uuid} constructorItem={item} index={index} />
          })}
        </section>
        {bun && <BurgerConstructorItem constructorItem={bun} type='bottom' />}
        <div className={`${styles.burgerConstructorTotal} mr-4 mt-10`}>
          <Price priceValue={price} size="medium" />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleOrder}
            disabled={!bun}
          >
            Оформить заказ
          </Button>
        </div>
      </section>

      {showOrderModal && (
        <Modal hideModal={hideModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
