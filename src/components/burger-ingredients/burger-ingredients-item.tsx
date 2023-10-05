import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store-hooks';
import { useDrag } from 'react-dnd';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { countConstructorItemsById } from '../../services/slices/burger-constructor';
import Price from '../price/price';
import styles from './burger-ingredients-item.module.css';
import { INGREDIENTS_DETAILS_URL } from '../../utils/constants';
import { TIngredient } from '../../utils/types';

const BurgerIngredientsItem: FC<{
  ingredientsItem: TIngredient
}> = ({ ingredientsItem }) => {
  const count = useAppSelector(countConstructorItemsById(ingredientsItem._id));
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: 'ingredientsItem',
    item: ingredientsItem,
  });

  return (
    <li
      className={styles.ingredientsItem}
      ref={dragRef}
    >
      <Link
        className={styles.ingredientsItemLink}
        to={INGREDIENTS_DETAILS_URL(ingredientsItem._id)}
        state={{ background: location }}
      >
        <img src={ingredientsItem.image} alt={ingredientsItem.name} className={styles.ingredientsItemImage} />
        <Price priceValue={ingredientsItem.price} />
        <h3 className={`${styles.ingredientsItemName} text text_type_main-default`}>{ingredientsItem.name}</h3>
        {!!count && (<Counter count={count} size='default' />)}
      </Link>
    </li>
  );
};

export default BurgerIngredientsItem;
