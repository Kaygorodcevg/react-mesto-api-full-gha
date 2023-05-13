import Popup from './Popup';

function InfoTooltip({
  onClose,
  buttonText,
  isOpen,
  name,
  title,
  onSubmit,
  img,
  ...props
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <form
        name={name}
        className={`popup__form ${
          name === 'infoTooltip' ? 'popup__info-tooltip' : ''
        }`}
        onSubmit={onSubmit}
      >
        {name === 'infoTooltip' && (
          <img src={img} alt={name} className="popup__info-tooltip-img" />
        )}
        <h2
          className={`popup__title ${
            name === 'infoTooltip' ? 'popup__title_tooltip' : ''
          }`}
        >
          {title}
        </h2>
        {props.children}
        <button
          className={`popup__submit-button ${
            name === 'infoTooltip' ? 'popup__submit-button_hidden' : ''
          }`}
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default InfoTooltip;
