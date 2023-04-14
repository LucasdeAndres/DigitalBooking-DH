import React from 'react';
import style from './styles/spinnerStyle.css';

const Spinner = () => {
  return (
    <div className={style.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export {Spinner};