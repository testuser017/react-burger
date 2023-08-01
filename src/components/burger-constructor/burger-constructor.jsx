import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
import BurgerConstructorData from '../../utils/data.json';
import styles from './burger-constructor.module.css';

const BurgerConstructorItem = ({ constructorItem, type }) => {
  const topBottom = {top: 'верх', bottom: 'низ'};
  const isLocked = Object.keys(topBottom).includes(type);
  const text = isLocked
    ? `${constructorItem.name} (${topBottom[`${type}`]})`
    : constructorItem.name;

  return (
    <div className={`${styles.constructorItem} ${isLocked && 'ml-8'}`}>
      {!isLocked && <DragIcon type="primary" />}
      <ConstructorElement
        text={text}
        price={constructorItem.price}
        thumbnail={constructorItem.image}
        type={type}
        isLocked={isLocked}
      />
    </div>
  );
};

BurgerConstructorItem.propTypes = {
  constructorItem: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['top', 'bottom']),
};

const BurgerConstructor = () => {
//const firstBun = BurgerConstructorData.find(el => el.type === 'bun');
  const getRandomElement = arr => arr[Math.floor(Math.random() * arr.length)];
  const randomBun = getRandomElement(BurgerConstructorData.filter(el => el.type === 'bun'));

  return (
    <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
      <BurgerConstructorItem constructorItem={randomBun} type='top' />
      <section className={`${styles.burgerConstructorWrap} custom-scroll`}>
        {BurgerConstructorData.filter(el => el.type !== 'bun').map(item => (
          <BurgerConstructorItem key={item._id} constructorItem={item} />
        ))}
      </section>
      <BurgerConstructorItem constructorItem={randomBun} type='bottom' />
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
