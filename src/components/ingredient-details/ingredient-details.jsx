import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DICTIONARY, MACRONUTRIENTS } from '../../utils/constants';
import styles from './ingredient-details.module.css';

const IngredientPropsItem = ({ propName, propValue }) => (
  <li className={styles.ingredientDetailsPropItem}>
    <div className="text text_type_main-default mb-2">{propName}</div>
    <div className="text text_type_digits-default">{propValue}</div>
  </li>
);

IngredientPropsItem.propTypes = {
  propName: PropTypes.string,
  propValue: PropTypes.number,
};

const IngredientDetails = () => {
  const dataList = useSelector(state => state.burgerIngredients.data);
  const { id } = useParams();
  const dataItem = dataList.find(item => item._id === id);

  const location = useLocation();
  const background = location.state?.background;

  return !!dataList.length && (
    <div className={`${styles.ingredientDetails} pr-15 pb-5 pl-15`}>
      {!background && <h1 className="text text_type_main-large mt-30">Детали ингредиента</h1>}
      <img src={dataItem.image_large} alt={dataItem.name} className={styles.ingredientDetailsImg} />
      <h3 className="text text_type_main-medium mt-4 mb-8">{dataItem.name}</h3>
      <ul className={`${styles.ingredientDetailsProps} text_color_inactive`}>
        {MACRONUTRIENTS.map(item =>
          <IngredientPropsItem key={item} propName={DICTIONARY[item]} propValue={dataItem[item]} />
        )}
      </ul>
    </div>
  );
};

export default IngredientDetails;
