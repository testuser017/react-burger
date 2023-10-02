import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';

const Price: FC<{
  priceValue: number | string;
  extraClass?: string;
}> = ({ priceValue = 0, extraClass = '' }) => {
  return (
    <div className={`${styles.price} ${extraClass}`}>
      <div className={styles.priceValue}>{priceValue}</div>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default Price;
