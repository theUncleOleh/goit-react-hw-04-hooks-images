import React from 'react';
import s from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <button className={s.button} onClick={onClick}>
      Load more
    </button>
  );
}
