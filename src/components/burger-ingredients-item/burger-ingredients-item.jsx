import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { ingredientType } from '../../utils/types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { countItemsById } from '../../services/slices/burger-constructor';
import { setIngredientData } from '../../services/slices/ingredient-details';
import Price from '../price/price';
import styles from './burger-ingredients-item.module.css';

const BurgerIngredientsItem = ({ ingredientsItem }) => {
  const dispatch = useDispatch();
  const count = useSelector(countItemsById(ingredientsItem._id, ingredientsItem.type));

  const [, dragRef] = useDrag({
    type: 'ingredientsItem',
    item: ingredientsItem,
  });

  return (
    <li
      className={styles.ingredientsItem}
      onClick={() => dispatch(setIngredientData(ingredientsItem))}
      ref={dragRef}
    >
      <img src={ingredientsItem.image} alt={ingredientsItem.name} className={styles.ingredientsItemImage} />
      <Price priceValue={ingredientsItem.price} />
      <h3 className={`${styles.ingredientsItemName} text text_type_main-default`}>{ingredientsItem.name}</h3>
      {!!count && (<Counter count={count} size="default" />)}
    </li>
  );
};

BurgerIngredientsItem.propTypes = {
  ingredientsItem: ingredientType.isRequired,
};

export default BurgerIngredientsItem;
