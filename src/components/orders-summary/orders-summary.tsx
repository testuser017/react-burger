import { FC } from 'react';
import { useAppSelector } from '../../hooks/store-hooks';
import { DICTIONARY } from '../../utils/constants';
import styles from './orders-summary.module.css';

const StatusList: FC<{ status: string, ordersNums: number[] }> = ({ status, ordersNums }) => (
  <div className={styles.statusList}>
    <h2 className={styles.statusListHeader}>{DICTIONARY(`${status}_sl`)}:</h2>
    <ul className={styles.statusListWrap} data-status={status}>
      {ordersNums.slice(0, 20).map(num => <li key={num} className={styles.statusListItem}>{num}</li>)}
    </ul>
  </div>
);

const OrdersSummary = () => {
  const ordersData = useAppSelector((state) => state.wsData.data);
  if (!ordersData?.orders) return null;

  const { done, pending } = ordersData.orders.reduce((acc: {[key: string]: number[]}, item) => {
    acc[item.status] ? acc[item.status].push(item.number) : acc[item.status] = [item.number];
    return acc;
  }, {});

  return (
    <section className={styles.ordersSummary}>
      <div className={styles.ordersSummaryStatus}>
        <StatusList status="done" ordersNums={done ?? []} />
        <StatusList status="pending" ordersNums={pending ?? []} />
      </div>
      <h2 className={styles.ordersSummaryHeader}>Выполнено за все время:</h2>
      <div className={styles.ordersSummaryValue}>{ordersData.total}</div>
      <h2 className={styles.ordersSummaryHeader}>Выполнено за сегодня:</h2>
      <div className={styles.ordersSummaryValue}>{ordersData.totalToday}</div>
    </section>
  );
};

export default OrdersSummary;
