import OrdersList from '../../components/orders-list/orders-list';
import OrdersSummary from '../../components/orders-summary/orders-summary';
import styles from './feed.module.css';

const FeedPage = () => (
  <main className="main">
    <h1 className={styles.feedPageHeader}>Лента заказов</h1>
    <OrdersList />
    <OrdersSummary />
  </main>
);

export default FeedPage;
