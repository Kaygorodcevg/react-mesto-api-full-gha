import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, handleChange, errors, isValid, resetForm, setIsValid } =
    useFormAndValidation();

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values);
    resetForm();
    setIsValid(false);
  }

  return (
    <PopupWithForm
      name="popup_avatar-edit"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      isValid={isValid}
    >
      <div className="popup__input-wrapper">
        <input
          name="avatar"
          id="avatarUrl-input"
          type="url"
          className={`popup__input popup__input_avatar ${
            errors.avatar && 'popup__input_error'
          }`}
          placeholder="Загрузите новый аватар"
          required
          value={values.avatar || ''}
          onChange={handleChange}
        />
        <span className="popup__input-error_active avatarUrl-input-error">
          {' '}
          {errors.avatar || ''}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
