import React from 'react';
import { Oval } from 'react-loader-spinner';
import s from './Loader.module.css';
export default function Loader() {
  return (
    <div className={s.icon}>
      <Oval color="#00BFFF" height={80} width={80} />
    </div>
  );
}
