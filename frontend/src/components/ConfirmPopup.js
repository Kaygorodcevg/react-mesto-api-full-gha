import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onConfirm, card }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(card);
  }

  return (
    <PopupWithForm
      name="popup_add-card"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Да"
    ></PopupWithForm>
  );
}

export default ConfirmPopup;
