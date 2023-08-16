import { forwardRef, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { ingredientType, ingredientsListType } from '../../utils/types';
import { Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { getApiData } from '../../services/slices/burger-ingredients';
import { setIngredientData } from '../../services/slices/ingredient-details';
import { countItemsById } from '../../services/slices/burger-constructor';
import Price from '../price/price';
import { DICTIONARY } from '../../utils/constants';
import styles from './burger-ingredients.module.css';

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
      onClick={() => {
        dispatch(setIngredientData(ingredientsItem));
      }}
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

const BurgerIngredientsGroup = forwardRef((props, ref) => {
  const { ingredientsGroupName, ingredientsList } = props;
  return (
    <section ref={ref}>
      <h2 className="text text_type_main-medium mb-6">{ingredientsGroupName}</h2>
      <ul className={`${styles.ingredientsList} pr-4 pl-4`}>
        {ingredientsList.map(item => (
          <BurgerIngredientsItem key={item._id} ingredientsItem={item} />
        ))}
      </ul>
    </section>
  );
});

BurgerIngredientsGroup.propTypes = {
  ingredientsGroupName: PropTypes.string.isRequired,
  ingredientsList: ingredientsListType.isRequired,
};

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const apiDataStatus = useSelector(state => state.burgerIngredients.status);
  const dataList = useSelector(state => state.burgerIngredients.data);

  const ingredientsTypes = [...new Set(dataList.map(x => x.type))];

  const [currentTab, setCurrentTab] = useState(ingredientsTypes[0]); // TODO: fix undefined init value ingredientsTypes[0]

  const scrollBlockRef = useRef(null);
  const ingredientsRef = useRef({});

  const scrollHandler = () => {
    const scrollBlockY = scrollBlockRef.current.getBoundingClientRect().y;
    const groupsYDiffs = ingredientsTypes.map(typeName => Math.abs(ingredientsRef.current[typeName].getBoundingClientRect().y - scrollBlockY));
    const minDiffIndex = groupsYDiffs.indexOf(Math.min(...groupsYDiffs));
    const nearestGroup = ingredientsTypes[minDiffIndex];
    setCurrentTab(nearestGroup);
  };

  const tabClickHandler = (typeName) => {
    ingredientsRef.current[typeName].scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (apiDataStatus === 'idle') {
      dispatch(getApiData());
    }
  }, [apiDataStatus, dispatch]);

  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <div className={styles.burgerIngredientsTabs}>
        {ingredientsTypes.map(item => (
          <Tab
            key={item}
            value={item}
            active={currentTab === item}
            onClick={tabClickHandler}
          >
            {DICTIONARY[item] ?? item}
          </Tab>
        ))}
      </div>

      <div className={`${styles.burgerIngredientsWrap} mt-10 custom-scroll`} ref={scrollBlockRef} onScroll={scrollHandler}>
        {ingredientsTypes.map(item => (
          <BurgerIngredientsGroup
            key={item}
            ingredientsGroupName={DICTIONARY[item] ?? item}
            ingredientsList={dataList.filter(el => el.type === item)}
            ref={el => ingredientsRef.current[item] = el}
          />
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
