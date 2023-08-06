import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ hideModal, children }) => {
  return (
    <div className={styles.modalOverlay} onClick={hideModal}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  hideModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default ModalOverlay;
