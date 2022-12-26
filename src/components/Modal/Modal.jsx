import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleClickEsc);

    return () => {
      window.removeEventListener('keydown', handleClickEsc);
    };
  }, []);

  const handleClickEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handelClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="overlay" onClick={handelClickBackdrop}>
      <div className="modal">{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
