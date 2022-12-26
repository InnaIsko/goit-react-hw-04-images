import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

import { ImageGalleryItem } from './ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';

export function ImageGallery({ data }) {
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');
  const [hidden, setHidden] = useState(true);

  const handlerClickVisually = () => {
    setHidden(PrevState => {
      return !PrevState;
    });
  };
  const handlerClickImg = (url, tags) => {
    console.log(url, tags);
    handlerClickVisually();
    setUrl(url);
    setTags(tags);
  };

  return (
    <ul className="gallery">
      {data.map(element => (
        <ImageGalleryItem
          key={element.id}
          imageInfo={element}
          handlerClickImg={handlerClickImg}
        />
      ))}
      {!hidden && (
        <Modal onClose={handlerClickVisually}>
          <img className="modal__img" src={url} alt={tags} />
          <button
            className="modal__btn"
            type="button"
            onClick={handlerClickVisually}
          >
            <AiOutlineClose />
          </button>
        </Modal>
      )}
    </ul>
  );
}

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
};
