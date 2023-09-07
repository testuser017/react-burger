import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { ingredientType } from '../../utils/types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { countItemsById } from '../../services/slices/burger-constructor';
import Price from '../price/price';
import styles from './burger-ingredients-item.module.css';
import { INGREDIENTS_DETAILS_URL } from '../../utils/constants';

const BurgerIngredientsItem = ({ ingredientsItem }) => {
  const count = useSelector(countItemsById(ingredientsItem._id, ingredientsItem.type));
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

BurgerIngredientsItem.propTypes = {
  ingredientsItem: ingredientType.isRequired,
};

export default BurgerIngredientsItem;
