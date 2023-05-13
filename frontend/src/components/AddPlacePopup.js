import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    resetForm,
    setIsValid,
  } = useFormAndValidation();

  React.useEffect(() => {
    resetForm();
    setValues({});
  }, [isOpen, resetForm, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.placeName,
      link: values.placeUrl,
    });
    resetForm();
    setIsValid(false);
  }

  return (
    <PopupWithForm
      name="popup_add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
      isValid={isValid}
    >
      <div className="popup__input-wrapper">
        <input
          name="placeName"
          id="placeName-input"
          type="text"
          className={`popup__input popup__input_place_name ${
            errors.placeName && 'popup__input_error'
          }`}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          onChange={handleChange}
          value={values.placeName || ''}
        />
        <span className="popup__input-error_active placeName-input-error">
          {errors.placeName || ''}
        </span>
      </div>
      <div className="popup__input-wrapper">
        <input
          name="placeUrl"
          id="url-input"
          type="url"
          className={`popup__input popup__input_place_url ${
            errors.placeUrl && 'popup__input_error'
          }`}
          placeholder="Ссылка на картинку"
          required
          onChange={handleChange}
          value={values.placeUrl || ''}
        />
        <span className="popup__input-error_active url-input-error">
          {errors.placeUrl || ''}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
