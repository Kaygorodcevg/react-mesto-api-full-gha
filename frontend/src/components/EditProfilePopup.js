import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
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
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser, isOpen, setValues, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
    resetForm();
    setIsValid(false);
  }

  return (
    <PopupWithForm
      name="popup_profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      isValid={isValid}
    >
      <div className="popup__input-wrapper">
        <input
          id="name-input"
          name="name"
          type="text"
          className={`popup__input popup__input_type_name ${
            errors.name && 'popup__input_error'
          }`}
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className="popup__input-error_active name-input-error">
          {' '}
          {errors.name || ''}
        </span>
      </div>
      <div className="popup__input-wrapper">
        <input
          id="job-input"
          name="about"
          type="text"
          className={`popup__input popup__input_type_job ${
            errors.about && 'popup__input_error'
          }`}
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          required
          value={values.about || ''}
          onChange={handleChange}
        />
        <span className="popup__input-error_active job-input-error">
          {' '}
          {errors.about || ''}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
