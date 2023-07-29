import { ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorData from '../../utils/data.json';
import styles from './burger-constructor.module.css';
import Price from '../price/price';

const BurgerConstructorItem = ({ constructorItem }) => {
  const {
    name: text,
    price,
    image: thumbnail,
    type,
  } = constructorItem;
  const isLocked = ['top', 'bottom'].includes(constructorItem.type);

  return (
    <div className={`${styles.constructorItem} mr-4`}>
      {!isLocked && <DragIcon type="primary" />}
      <ConstructorElement text={text} price={price} thumbnail={thumbnail} type={type} isLocked={isLocked} />
    </div>
  );
};

const BurgerConstructor = () => {
  const firstBun = BurgerConstructorData.find(el => el.type === 'bun');

  return (
    <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
      <BurgerConstructorItem constructorItem={{...firstBun, type: 'top'}} />
      <section className={`${styles.burgerConstructorWrap} custom-scroll`}>
        {BurgerConstructorData.map(item => (
          <BurgerConstructorItem key={item._id} constructorItem={item} />
        ))}
      </section>
      <BurgerConstructorItem constructorItem={{...firstBun, type: 'bottom'}} />
      <div className={`${styles.burgerConstructorTotal} mr-4 mt-10`}>
        <Price priceValue={610} size="medium" />
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
