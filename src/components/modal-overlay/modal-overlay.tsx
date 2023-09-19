import { FC, PropsWithChildren } from 'react';
import styles from './modal-overlay.module.css';

type Props = {
  hideModal: () => void;
};

const ModalOverlay: FC<PropsWithChildren<Props>> = ({ hideModal, children }) => {
  return (
    <div className={styles.modalOverlay} onClick={hideModal}>
      {children}
    </div>
  );
};

export default ModalOverlay;
