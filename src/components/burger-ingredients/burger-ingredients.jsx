import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ingredientsListType } from '../../utils/types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import { getApiData } from '../../services/slices/burger-ingredients';
import { DICTIONARY } from '../../utils/constants';
import styles from './burger-ingredients.module.css';

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

  const ingredientsTypes = useMemo(
    () => [...new Set(dataList.map(x => x.type))],
    [dataList]
  );
  const [currentTab, setCurrentTab] = useState(ingredientsTypes[0]);
  useEffect(() => {
    setCurrentTab(ingredientsTypes[0]);
  }, [ingredientsTypes]);

  const scrollBlockRef = useRef(null);
  const ingredientsGroupsRefs = useRef({});

  const scrollHandler = () => {
    const scrollBlockY = scrollBlockRef.current.getBoundingClientRect().y;
    const groupsYDiffs = ingredientsTypes.map(typeName => Math.abs(ingredientsGroupsRefs.current[typeName].getBoundingClientRect().y - scrollBlockY));
    const minDiffIndex = groupsYDiffs.indexOf(Math.min(...groupsYDiffs));
    const closestGroup = ingredientsTypes[minDiffIndex];
    setCurrentTab(closestGroup);
  };

  const tabClickHandler = (typeName) => {
    ingredientsGroupsRefs.current[typeName].scrollIntoView({ behavior: 'smooth' });
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
            ref={el => ingredientsGroupsRefs.current[item] = el}
          />
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
