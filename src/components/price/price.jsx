import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';

const Price = ({ priceValue = 0, size = 'default' }) => {
  return (
    <div className={`${styles.price} ${styles[`size-${size}`]}`}>
      <div className={`text text_type_digits-${size}`}>{priceValue}</div>
      <CurrencyIcon type="primary" />
    </div>
  );
};

Price.propTypes = {
  priceValue: PropTypes.number,
  size: PropTypes.string,
};

export default Price;
