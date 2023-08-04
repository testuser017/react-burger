import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
import { DICTIONARY } from '../../utils/constants';
import styles from './burger-ingredients.module.css';

const BurgerIngredientsItem = ({ ingredientsItem, showModal }) => {
  return (
    <li
      className={styles.ingredientsItem}
      onClick={() => window.getSelection().toString() === '' && showModal('ingredient', ingredientsItem)}
    >
      <img src={ingredientsItem.image} alt={ingredientsItem.name} className={styles.ingredientsItemImage} />
      <Price priceValue={ingredientsItem.price} />
      <h3 className={`${styles.ingredientsItemName} text text_type_main-default`}>{ingredientsItem.name}</h3>
      <Counter count={1} size="default" />
    </li>
  );
};

const ingredientsItemPropTypes = PropTypes.shape({
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
});

BurgerIngredientsItem.propTypes = {
  ingredientsItem: ingredientsItemPropTypes.isRequired,
  showModal: PropTypes.func,
};

const BurgerIngredientsGroup = ({ ingredientsGroupName, ingredientsList, showModal }) => {
  return (
    <section>
      <h2 className="text text_type_main-medium mb-6">{ingredientsGroupName}</h2>
      <ul className={`${styles.ingredientsList} pr-4 pl-4`}>
        {ingredientsList.map(item => (
          <BurgerIngredientsItem key={item._id} ingredientsItem={item} showModal={showModal} />
        ))}
      </ul>
    </section>
  );
};

BurgerIngredientsGroup.propTypes = {
  ingredientsGroupName: PropTypes.string.isRequired,
  ingredientsList: PropTypes.arrayOf(ingredientsItemPropTypes).isRequired,
  showModal: PropTypes.func,
};

const BurgerIngredients = ({ data, showModal }) => {
  const groups = ['bun', 'sauce', 'main'];
  const [current, setCurrent] = useState(groups[0]);

// TODO: Tab onClick -> scroll to block

  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <div className={styles.burgerIngredientsTabs}>
        {groups.map(item => (
          <Tab
            key={item}
            value={item}
            active={current === item}
            onClick={setCurrent}
          >
            {DICTIONARY[item]}
          </Tab>
        ))}
      </div>

      <div className={`${styles.burgerIngredientsWrap} mt-10 custom-scroll`}>
        {groups.map(item => (
          <BurgerIngredientsGroup
            key={item}
            ingredientsGroupName={DICTIONARY[item]}
            ingredientsList={data.filter(el => el.type === item)}
            showModal={showModal}
          />
        ))}
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  showModal: PropTypes.func,
};

export default BurgerIngredients;
