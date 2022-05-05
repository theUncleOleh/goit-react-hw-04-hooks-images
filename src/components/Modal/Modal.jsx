import React, { Component } from 'react';
import {createPortal} from 'react-dom';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root')
class Modal extends Component {
  componentDidMount() {
    console.log('componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    console.log('componentWillUnmout');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('push the button escape');
      this.props.onClose();
    }
    console.log(e.code);
  };

  handleBackdropClose = event => {
    // console.log('кликнули в бэкдроппп');
    // console.log('curentTarget', event.currentTarget);
    // console.log('target', event.target);
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.handleBackdropClose}>
        <div>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
  //
};

export default Modal;
