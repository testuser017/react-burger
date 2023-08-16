import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
import { ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { addIngredient, delIngredient, moveIngredient, burgerConstructorTotalPrice } from '../../services/slices/burger-constructor';
import { orderRequest } from '../../services/slices/order';
import { emptyConstructor } from '../../services/slices/burger-constructor';
import Price from '../price/price';
import { DICTIONARY } from '../../utils/constants';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import styles from './burger-constructor.module.css';

const BurgerConstructorItem = ({ constructorItem, type, index }) => {
  const dispatch = useDispatch();

  const isLocked = ['top', 'bottom'].includes(type);
  const text = isLocked
    ? `${constructorItem.name} (${DICTIONARY[`${type}`]})`
    : constructorItem.name;

  // https://react-dnd.github.io/react-dnd/examples/sortable/simple
  const ref = useRef(null);
  const [, dropRef] = useDrop({
    accept: 'constructorItem',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(moveIngredient({dragIndex, hoverIndex})); // moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex;
    },
  });
  const [{isDragging}, dragRef] = useDrag({
    type: isLocked ? 'constructorItemBun' : 'constructorItem',
    item: () => ({ ...constructorItem.uuid, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  dragRef(dropRef(ref));

  return (
    <div className={`${styles.constructorItem} ${isDragging && styles.constructorItemDndDragging} ${isLocked && 'ml-8'}`} ref={ref}>
      {!isLocked && <DragIcon type="primary" />}
      <ConstructorElement
        text={text}
        price={constructorItem.price}
        thumbnail={constructorItem.image}
        type={type}
        isLocked={isLocked}
        handleClose={() => dispatch(delIngredient(constructorItem.uuid))}
      />
    </div>
  );
};

BurgerConstructorItem.propTypes = {
  constructorItem: ingredientType,
  type: PropTypes.oneOf(['top', 'bottom']),
  index: PropTypes.number,
};

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [showOrderModal, setShowOrderModal] = useState(false);

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
    dispatch(orderRequest([
      bun._id,
      ...filling.map(item => item._id),
      bun._id,
    ]));
    setShowOrderModal(true);
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
