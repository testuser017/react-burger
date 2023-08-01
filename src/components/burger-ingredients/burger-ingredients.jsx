import { useState } from 'react';
import PropTypes from 'prop-types';
import { Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
import BurgerIngredientsData from '../../utils/data.json';
import styles from './burger-ingredients.module.css';

const BurgerIngredientsItem = ({ ingredientsItem }) => {
  return (
    <li className={styles.ingredientsItem}>
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
};

const BurgerIngredientsGroup = ({ ingredientsGroupName, ingredientsList }) => {
  return (
    <section>
      <h2 className="text text_type_main-medium mb-6">{ingredientsGroupName}</h2>
      <ul className={`${styles.ingredientsList} pr-4 pl-4`}>
        {ingredientsList.map(item => (
          <BurgerIngredientsItem key={item._id} ingredientsItem={item} />
        ))}
      </ul>
    </section>
  );
};

BurgerIngredientsGroup.propTypes = {
  ingredientsGroupName: PropTypes.string.isRequired,
  ingredientsList: PropTypes.arrayOf(ingredientsItemPropTypes).isRequired,
};

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('one');

  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <div className={styles.burgerIngredientsTabs}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={`${styles.burgerIngredientsWrap} mt-10 custom-scroll`}>
        <BurgerIngredientsGroup ingredientsGroupName="Булки" ingredientsList={BurgerIngredientsData.filter(el => el.type === 'bun')} />
        <BurgerIngredientsGroup ingredientsGroupName="Соусы" ingredientsList={BurgerIngredientsData.filter(el => el.type === 'sauce')} />
        <BurgerIngredientsGroup ingredientsGroupName="Начинки" ingredientsList={BurgerIngredientsData.filter(el => el.type === 'main')} />
      </div>
    </section>
  );
};

export default BurgerIngredients;
