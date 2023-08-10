import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledModal } from './Styled';

const Modal = ({ children, closeModal }) => {
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [closeModal]);

  return (
    <StyledModal onClick={closeModal}>
      <div className="modal">{children}</div>
    </StyledModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
