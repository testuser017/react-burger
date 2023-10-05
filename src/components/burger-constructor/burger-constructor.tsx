import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { useDrop } from 'react-dnd';
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { addIngredient, getConstructorTotalPrice, getConstructorBun, getConstructorFilling } from '../../services/slices/burger-constructor';
import { getUser } from '../../services/slices/user';
import { requestOrder } from '../../services/slices/order';
import { emptyConstructor } from '../../services/slices/burger-constructor';
import BurgerConstructorItem from './burger-constructor-item';
import Price from '../price/price';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { DICTIONARY, LOGIN_URL } from '../../utils/constants';
import styles from './burger-constructor.module.css';
import stylesItem from './burger-constructor-item.module.css';
import { TIngredient } from '../../utils/types';

type Props = {
  bun: TIngredient;
  type: 'top' | 'bottom';
};

const BurgerConstructorBun: FC<Props> = ({ bun, type }) => (
  <div className={`${stylesItem.constructorItem} ml-8`}>
    <ConstructorElement
      text={`${bun.name} (${DICTIONARY(`${type}`)})`}
      price={bun.price}
      thumbnail={bun.image}
      type={type}
      isLocked={true}
    />
  </div>
);

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const [showOrderModal, setShowOrderModal] = useState(false);

  const navigate = useNavigate();
  const user = useAppSelector(getUser);
  const bun = useAppSelector(getConstructorBun);
  const filling = useAppSelector(getConstructorFilling);
  const price = useAppSelector(getConstructorTotalPrice);

  const [{isHover}, dropRef] = useDrop({
    accept: 'ingredientsItem',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      dispatch(addIngredient(item));
    },
  });

  const handleOrderClick = () => {
    if(!bun) return;
    if(user) {
      dispatch(requestOrder(
        {
          ingredients: [
            bun._id,
            ...filling.map(item => item._id),
            bun._id,
          ]
        }
      ));
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
        {bun && <BurgerConstructorBun bun={bun} type='top' />}
        <section className={`${styles.burgerConstructorWrap} custom-scroll`}>
          {filling.map((item, index) => {
            return <BurgerConstructorItem key={item.uuid} constructorItem={item} index={index} />
          })}
        </section>
        {bun && <BurgerConstructorBun bun={bun} type='bottom' />}
        <div className={`${styles.burgerConstructorTotal} mr-4 mt-10`}>
          <Price priceValue={price} extraClass="size-medium" />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleOrderClick}
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
