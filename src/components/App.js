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
  }, []);

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
        console.log('до', cards)
        setCards((state) => {
        console.log(state)
        return state.map((c) => c._id === card._id ? adapter(newCard) : c)
      });
        console.log('после', cards)
    })
    .catch((err) => console.log(err))
  };

  function handleCardDelete(deletedCard) {

    api.deleteCard(deletedCard._id).then(() => {
      console.log('до', cards)
      
      setCards(cards.filter(card => card._id !== deletedCard._id));
      console.log('после', cards)
      
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
    })
    .catch((err) => console.log(err))
    closeAllPopups()
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container page__container">
          
          <Header />
          <CurrentUserContext1.Provider value={cards}>
          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          </CurrentUserContext1.Provider>

          <Footer />
              
          <EditProfilePopup isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <PopupWithForm name={'card'} title={'Новое место'} isOpened={isAddPlacePopupOpen} onClose={closeAllPopups}>
            <>
            <input
                 placeholder="Название"
                 name="name"
                 type="text"
                 className="popup__field"
                 id="title-field"
                 autoComplete="off"
                 required
                 /*value=""*/
                 minLength="2"
                 maxLength="30"
                 />
                <span className="popup__error title-field-error"></span>
                <input
                 placeholder="Ссылка на картинку"
                 name="link"
                 type="url"
                 className="popup__field"
                 id="link-field"
                 required
                 autoComplete="off"
                 /*value=""*/
                 />
                <span className="popup__error link-field-error"></span>
                <button className="popup__button" type="submit">Сохранить</button>
            </>
          </ PopupWithForm>
              
          <PopupWithForm name={'confirm'} title={'Вы уверены?'}>
            <>
            <button className="popup__button" type="submit">Да</button>
            </>
          </ PopupWithForm>      
          

          <PopupWithForm name={'avatar'} title={'Обновить аватар'} isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups}>
            <>
            <input
                 placeholder="Новый аватар"
                 name="image"
                 type="url"
                 className="popup__field popup__field_avatar"
                 id="avatar-field"
                 autoComplete="off"
                 required
                 /*value=""*/
                 />
                <span className="popup__error avatar-field-error"></span>
                <button className="popup__button popup__button_avatar" type="submit">Сохранить</button>
            </>
          </ PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        </div>
      </div>            
      </CurrentUserContext.Provider>      
    </div>
            );
}

export default App;
