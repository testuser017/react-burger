import OrdersList from '../../components/orders-list/orders-list';
import ProfilePageNav from './profile-nav';

const ProfileOrdersPage = () => {
  return (
    <main className="main-profile">
      <ProfilePageNav />
      <OrdersList />
    </main>
  );
};

export default ProfileOrdersPage;
