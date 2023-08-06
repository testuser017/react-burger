import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById("react-modals");

const Modal = ({ modalHeaderText = '', hideModal, children }) => {

  useEffect(() => {
    const keyPressHandler = (event) => {
      if(event.key === 'Escape') {
        hideModal();
      }
    };
    document.addEventListener('keydown', keyPressHandler);
    return () => {
      document.removeEventListener('keydown', keyPressHandler);
    }
  }, [])

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

Modal.propTypes = {
  modalHeaderText: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
