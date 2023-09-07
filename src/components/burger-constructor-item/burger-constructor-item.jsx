import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { delIngredient, moveIngredient } from '../../services/slices/burger-constructor';
import { DICTIONARY } from '../../utils/constants';
import styles from './burger-constructor-item.module.css';

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

  const handleClose = () => dispatch(delIngredient(constructorItem.uuid));

  return (
    <div className={`${styles.constructorItem} ${isDragging && styles.constructorItemDndDragging} ${isLocked && 'ml-8'}`} ref={ref}>
      {!isLocked && <DragIcon type="primary" />}
      <ConstructorElement
        text={text}
        price={constructorItem.price}
        thumbnail={constructorItem.image}
        type={type}
        isLocked={isLocked}
        handleClose={handleClose}
      />
    </div>
  );
};

BurgerConstructorItem.propTypes = {
  constructorItem: ingredientType,
  type: PropTypes.oneOf(['top', 'bottom']),
  index: PropTypes.number,
};

export default BurgerConstructorItem;
