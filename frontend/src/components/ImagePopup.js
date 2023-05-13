// import Popup from './Popup';
import { useEffect } from 'react';

function ImagePopup({ card, onClose }) {
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_zoom-image ${card.name && 'popup_opened'}`}
      onKeyDown={useEffect(() => {
        const closeByEscape = (e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        };
        document.addEventListener('keydown', closeByEscape);
        return () => document.removeEventListener('keydown', closeByEscape);
      }, [])}
      onClick={handleOverlay}
    >
      <div className="popup__zoom-wrapper">
        <button
          type="button"
          className="popup__close-icon popup__close-icon_zoom-image"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img
            src={card?.link}
            alt={card?.name}
            className="popup__picture"
          ></img>
          <figcaption className="popup__figcaption">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;

// function ImagePopup({ card, onClose }) {
//   return (
//     <Popup isOpen={card} onClose={onClose} name="popup_zoom-image">
//       <figure className="popup__figure">
//         <img src={card?.link} alt={card?.name} className="popup__picture"></img>
//         <figcaption className="popup__figcaption">{card?.name}</figcaption>
//       </figure>
//     </Popup>
//   );
// }
