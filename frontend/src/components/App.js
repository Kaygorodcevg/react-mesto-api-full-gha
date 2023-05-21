import React, { useEffect, useState, useCallback } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [message, setMessage] = useState({ img: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    loggedIn && Promise.all([Api.getInitialCards(), Api.getUserInfo()])
      .then(([cardsData, userData]) => {
        setCards(cardsData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    Api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function onCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleDeleteClick(card) {
    setConfirmPopupOpen(true);
    setDeleteCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({});
    setInfoTooltip(false);
  }

  function handleUpdateUser(userData) {
    Api.changeUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarData) {
    Api.changeAvatar(avatarData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(cardData) {
    Api.getNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleRegistration = useCallback(
    async (password, email) => {
      try {
        const data = await auth.register(password, email);
        if (data) {
          setEmail(data.email);
          setMessage({
            img: success,
            text: 'Вы успешно зарегистрировались!',
          });
          setInfoTooltip(true);
          navigate('/sign-in', { replace: true });
        }
      } catch (err) {
        setMessage({
          img: fail,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        setInfoTooltip(true);
      }
    },
    [navigate]
  );

  const handleAutorization = useCallback(
    async (password, email) => {
      try {
       auth.authorize(password, email)
       .then((token) => {
        auth.getContent(token)
          .then((res) => {
            setEmail(res.email)
            setLoggedIn(true);
            navigate('/', { replace: true })
          })
      })
      } catch (err) {
        setInfoTooltip(true);
        console.log(err);
      }
    },
    [navigate]
  );

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    loggedIn && Promise.all([Api.getInitialCards(), Api.getUserInfo()])
      .then(([cardsData, userData]) => {
        setCards(cardsData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  function logout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={email} logout={logout} />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                onRegister={handleRegistration}
                infoTooltip={infoTooltip}
              />
            }
          ></Route>
          <Route
            path="/sign-in"
            element={<Login onAuth={handleAutorization} />}
          ></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={onCardClick}
                handleCardLike={handleCardLike}
                handleCardDelete={handleDeleteClick}
                cards={cards}
              />
            }
          />
        </Routes>
        <Footer />
        <InfoTooltip
          name="infoTooltip"
          isOpen={infoTooltip}
          onClose={closeAllPopups}
          title={message.text}
          img={message.img}
        />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        ></EditProfilePopup>

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        ></AddPlacePopup>

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        ></EditAvatarPopup>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

        <ConfirmPopup
          card={deleteCard}
          onConfirm={handleCardDelete}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
        ></ConfirmPopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
