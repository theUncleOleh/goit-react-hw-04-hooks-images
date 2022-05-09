import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('push the button escape');
      onClose();
    }
    console.log(e.code);
  };

  const handleBackdropClose = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClose}>
      <div>{children}</div>
    </div>,
    modalRoot
  );
}
