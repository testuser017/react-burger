import { FC, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/store-hooks';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import { DICTIONARY } from '../../utils/constants';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '../../utils/types';
import { getIngredientsData } from '../../services/slices/burger-ingredients';

type Props = {
  ingredientsGroupName: string;
  ingredientsList: TIngredient[];
};

const BurgerIngredientsGroup = forwardRef<HTMLElement, Props>((props, ref) => {
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

const BurgerIngredients: FC = () => {
  const dataList = useAppSelector(getIngredientsData);

  const ingredientsTypes = useMemo<string[]>(
//  () => [...new Set(dataList.map(x => x.type))], // ts 2802 downlevelIteration
    () => [...Array.from(new Set(dataList.map(x => x.type)))],
    [dataList]
  );
  const [currentTab, setCurrentTab] = useState(ingredientsTypes[0]);
  useEffect(() => {
    setCurrentTab(ingredientsTypes[0]);
  }, [ingredientsTypes]);

  const scrollBlockRef = useRef<HTMLDivElement>(null);
//const ingredientsGroupsRefs = useRef<{[key: typeof ingredientsTypes[number]]: HTMLElement}>({}); // ??
  const ingredientsGroupsRefs = useRef<{[key: string]: HTMLElement}>({});

  const scrollHandler = () => {
    const scrollBlockY = scrollBlockRef.current?.getBoundingClientRect().y ?? 0;
    const groupsYDiffs = ingredientsTypes.map((typeName) => Math.abs(ingredientsGroupsRefs.current[typeName].getBoundingClientRect().y - scrollBlockY));
    const minDiffIndex = groupsYDiffs.indexOf(Math.min(...groupsYDiffs));
    const closestGroup = ingredientsTypes[minDiffIndex];
    setCurrentTab(closestGroup);
  };

  const tabClickHandler = (typeName: string) => {
    ingredientsGroupsRefs.current[typeName].scrollIntoView({ behavior: 'smooth' });
  };

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
            ref={el => ingredientsGroupsRefs.current[item] = el as HTMLElement}
          />
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
