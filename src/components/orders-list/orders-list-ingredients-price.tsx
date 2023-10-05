import { FC } from 'react';
import { useAppSelector } from '../../hooks/store-hooks';
import { getIngredients } from '../../services/slices/burger-ingredients';
import Price from '../price/price';
import { TIngredient } from '../../utils/types';
import styles from './orders-list-ingredients-price.module.css';

const OrdersIngsPrice: FC<{ ingsIds: string[] }> = ({ ingsIds }) => {
  const ingsAll = useAppSelector(getIngredients);
  if (!ingsAll.length || !ingsIds.length) return null;

  type TAcc = {
    ingredients: TIngredient[];
    priceTotal: number;
  };

  const { ingredients, priceTotal } = ingsIds.reduce((acc: TAcc, _id) => {
    const ing = ingsAll.find(el => el._id === _id);
    if (ing) {
      acc.ingredients.push(ing);
      acc.priceTotal += ing.price;
    }
    return acc;
  }, { ingredients: [], priceTotal: 0 });
  const countRest = ingredients.length > 6 ? `+${ingredients.length - 6}` : null;

  return (
    <div className={styles.ordersIngsPrice}>
      <div className={styles.ordersIngs}>
        {ingredients.slice(0, 6).reverse().map((item, index) => (
          <div className={styles.ordersImgWrap} key={index} data-rest={!index ? countRest : null}>
            <img src={item.image_mobile} alt="" />
          </div>
        ))}
      </div>
      <Price priceValue={priceTotal} extraClass={styles.ordersPrice} />
    </div>
  );
};

export default OrdersIngsPrice;
