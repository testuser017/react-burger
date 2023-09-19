import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';

const Price: FC<{
  priceValue: number;
  size?: 'default' | 'medium';
}> = ({ priceValue = 0, size = 'default' }) => {
  return (
    <div className={`${styles.price} ${styles[`size-${size}`]}`}>
      <div className={`text text_type_digits-${size}`}>{priceValue}</div>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default Price;
