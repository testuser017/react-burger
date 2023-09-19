import { FC, useRef } from 'react';
import { useAppDispatch } from '../../hooks/store-hooks';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { TIngredientConstructor } from '../../utils/types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { delIngredient, moveIngredient } from '../../services/slices/burger-constructor';
import styles from './burger-constructor-item.module.css';

type Props = {
  constructorItem: TIngredientConstructor;
  index: number;
};

const BurgerConstructorItem: FC<Props> = ({ constructorItem, index }) => {
  const dispatch = useAppDispatch();

  // https://react-dnd.github.io/react-dnd/examples/sortable/simple
  const ref = useRef<HTMLDivElement>(null);
  const [, dropRef] = useDrop({
    accept: 'constructorItem',
    hover(item: Props, monitor) {
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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
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
    type: 'constructorItem',
    item: () => ({ uuid: constructorItem.uuid, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  dragRef(dropRef(ref));

  const handleClose = () => dispatch(delIngredient(constructorItem.uuid));

  return (
    <div className={`${styles.constructorItem} ${isDragging && styles.constructorItemDndDragging}`} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={constructorItem.name}
        price={constructorItem.price}
        thumbnail={constructorItem.image}
        handleClose={handleClose}
      />
    </div>
  );
};

export default BurgerConstructorItem;
