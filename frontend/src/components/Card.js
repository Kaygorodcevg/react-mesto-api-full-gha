import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__reaction ${
    isLiked && 'elements__reaction_active'
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__list-item">
      <img
        className="elements__image elements__image_template"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      ></img>
      <div className="elements__discription">
        <h2 className="elements__text elements__text_template">{card.name}</h2>
        <div className="elements__reaction-wrapper">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="elements__counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="elements__remove-button"
          onClick={handleDeleteClick}
        ></button>
      )}
    </li>
  );
}

export default Card;
