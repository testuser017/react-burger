import { FC, PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById("react-modals") as HTMLElement;

type Props = {
  hideModal: () => void;
  modalHeaderText?: string;
};

const Modal: FC<PropsWithChildren<Props>> = ({ modalHeaderText = '', hideModal, children }) => {

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
  // eslint-disable-next-line
  }, []);

  return createPortal(
    (
      <ModalOverlay hideModal={hideModal}>
        <div className={styles.modal} onClick={event => event.stopPropagation()}>
          <div className={styles.modalHeaderWrap}>
            {modalHeaderText && <h2 className="text text_type_main-large">{modalHeaderText}</h2>}
            <Button
              htmlType="button"
              type="secondary"
              className={styles.modalButtonClose}
              onClick={hideModal}
            >
              <CloseIcon type="primary" />
            </Button>
          </div>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalRoot
  )
};

export default Modal;
