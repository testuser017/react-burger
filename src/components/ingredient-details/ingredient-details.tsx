import { FC } from 'react';
import { useAppSelector } from '../../hooks/store-hooks';
import { useParams } from 'react-router-dom';
import { DICTIONARY } from '../../utils/constants';
import styles from './ingredient-details.module.css';
import { TIngredient } from '../../utils/types';
import { getIngredients } from '../../services/slices/burger-ingredients';

const IngredientPropsItem: FC<{propName: string; propValue: string}> = ({ propName, propValue }) => (
  <li className={styles.ingredientDetailsPropItem}>
    <div className="text text_type_main-default mb-2">{propName}</div>
    <div className="text text_type_digits-default">{propValue}</div>
  </li>
);

const IngredientDetails: FC = () => {
  const dataList = useAppSelector(getIngredients);
  const { id } = useParams();
  const dataItem = dataList.find((item) => item._id === id);

  if(!dataList.length || !dataItem) return null;

  return (
    <div className={styles.ingredientDetails}>
      <h1 className={styles.ingredientDetailsHeader}>Детали ингредиента</h1>
      <img src={dataItem.image_large} alt={dataItem.name} className={styles.ingredientDetailsImg} />
      <h3 className="text text_type_main-medium mt-4 mb-8">{dataItem.name}</h3>
      <ul className={`${styles.ingredientDetailsProps} text_color_inactive`}>
        {['calories', 'proteins', 'fat', 'carbohydrates'].map((item) =>
          <IngredientPropsItem key={item} propName={DICTIONARY(item)} propValue={dataItem[item as keyof TIngredient] as string} />
        )}
      </ul>
    </div>
  );
};

export default IngredientDetails;
