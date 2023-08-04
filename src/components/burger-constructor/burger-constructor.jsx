import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
import { DICTIONARY } from '../../utils/constants';
import styles from './burger-constructor.module.css';

const BurgerConstructorItem = ({ constructorItem, type }) => {
  const isLocked = ['top', 'bottom'].includes(type);
  const text = isLocked
    ? `${constructorItem.name} (${DICTIONARY[`${type}`]})`
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

const BurgerConstructor = ({ data, showModal }) => {
  const firstBun = data.find(el => el.type === 'bun');
  let priceTotal = firstBun.price * 2;

  return (
    <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
      <BurgerConstructorItem constructorItem={firstBun} type='top' />
      <section className={`${styles.burgerConstructorWrap} custom-scroll`}>
        {data.filter(el => el.type !== 'bun').map(item => {
          priceTotal += item.price;
          return <BurgerConstructorItem key={item._id} constructorItem={item} />
        })}
      </section>
      <BurgerConstructorItem constructorItem={firstBun} type='bottom' />
      <div className={`${styles.burgerConstructorTotal} mr-4 mt-10`}>
        <Price priceValue={priceTotal} size="medium" />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => showModal('order')}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  showModal: PropTypes.func,
};

export default BurgerConstructor;
