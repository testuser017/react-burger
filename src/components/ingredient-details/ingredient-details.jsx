import PropTypes from 'prop-types';
import { DICTIONARY } from '../../utils/constants';
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

const IngredientDetails = ({ data }) => {
  const macronutrients = ['calories', 'proteins', 'fat', 'carbohydrates'];

  return (
    <div className={`${styles.ingredientDetails} pr-15 pb-5 pl-15`}>
      <img src={data.image_large} alt={data.name} className={styles.ingredientDetailsImg} />
      <h3 className="text text_type_main-medium mt-4 mb-8">{data.name}</h3>
      <ul className={`${styles.ingredientDetailsProps} text_color_inactive`}>
        {macronutrients.map(item =>
          <IngredientPropsItem key={item} propName={DICTIONARY[item]} propValue={data[item]} />
        )}
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IngredientDetails;
