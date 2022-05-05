import React from 'react';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) {
  return (
    <li className={s.item} onClick={() => onClick(largeImageURL)}>
      <img src={webformatURL} alt={tags} className={s.img} />
    </li>
  );
}

