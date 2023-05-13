import Popup from './Popup';

function PopupWithForm({
  isOpen,
  name,
  onClose,
  buttonText,
  onSubmit,
  ...props
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <form name={name} className="popup__form" onSubmit={onSubmit}>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button className="popup__submit-button" type="submit">
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
