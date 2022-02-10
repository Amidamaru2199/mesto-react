import '../index.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext, CurrentUserContext1 } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const defaultUser = {
    _id: '',
    about: '',
    avatar: '',
    cohort: '',
    name: ''
  };

  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    api.getUserInfo()
    .then(profileData => {
      setCurrentUser(profileData)
    })
    .catch((err) => console.log(err))

    api.getInitialCards()
    .then(cardData => {
      setCards(cardData.map((item => adapter(item))))
    })
    .catch((err) => console.log(err))
  }, [cards]);

  function adapter(serverCardData) {
    return {
      _id: serverCardData._id,
      src: serverCardData.link,
      title: serverCardData.name,
      likes: serverCardData.likes,
      owner: serverCardData.owner._id
    }
  };

  function handleCardLike(card) {
    
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => {

        return state.map((c) => c._id === card._id ? adapter(newCard) : c)
      });
    })
    .catch((err) => console.log(err))
  };

  function handleCardDelete(deletedCard) {

    api.deleteCard(deletedCard._id).then(() => {
            
      setCards(cards.filter(card => card._id !== deletedCard._id));      
  })
  .catch((err) => console.log(err))
  };

  function handleCardClick(card) {
    setSelectedCard(card)
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);    
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };

  function handleUpdateUser(profileData) {
    api.editProfile(profileData)
    .then(profileData => {
      setCurrentUser(profileData)
      closeAllPopups()
    })
    .catch((err) => console.log(err))
  };

  function handleUpdateAvatar(Avatar) {
    api.editAvatar(Avatar)
    .then(profileAvatar => {
      setCurrentUser(profileAvatar)
      closeAllPopups()
    })
    .catch((err) => console.log(err))
  };

  function handleAddPlaceSubmit(cardData) {
    api.createCard(cardData)
    .then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups()
    })
    .catch((err) => console.log(err))
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserContext1.Provider value={cards}>
      <div className="page">
        <div className="container page__container">
          
          <Header />
          
          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Footer />
              
          <EditProfilePopup isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
              
          <PopupWithForm name={'confirm'} title={'Вы уверены?'}>
            <>
            <button className="popup__button" type="submit">Да</button>
            </>
          </ PopupWithForm>      
          

          <EditAvatarPopup isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        </div>
      </div>
      </CurrentUserContext1.Provider>          
      </CurrentUserContext.Provider>      
    </div>
            );
}

export default App;
