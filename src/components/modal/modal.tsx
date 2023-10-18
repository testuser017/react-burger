import { FC, PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal: FC<PropsWithChildren<{ hideModal: () => void }>> = ({ hideModal, children }) => {

  useEffect(() => {
    const keyPressHandler = (event: KeyboardEvent) => {
      if(event.key === 'Escape') {
        hideModal();
      }
    };
    document.addEventListener('keydown', keyPressHandler);
    return () => {
      document.removeEventListener('keydown', keyPressHandler);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return createPortal(
    (
      <ModalOverlay hideModal={hideModal}>
        <div className={styles.modal} onClick={event => event.stopPropagation()}>
          {children}
          <Button
            htmlType="button"
            type="secondary"
            className={styles.modalButtonClose}
            onClick={hideModal}
            data-testid="closeModal"
          >
            <CloseIcon type="primary" />
          </Button>
        </div>
      </ModalOverlay>
    ),
    modalRoot
  )
};

export default Modal;
