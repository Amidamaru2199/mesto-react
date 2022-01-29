//import logo from '../images/Vector.svg';
import '../index.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})

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
  }

  return (
    <div className="App">
      <div className="page">
        <div className="container page__container">
          
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
          />

          <Footer />
              
          <PopupWithForm name={'edit'} title={'Редактировать профиль'} isOpened={isEditProfilePopupOpen} onClose={closeAllPopups}>
            <>
            <input
                 placeholder="Имя"
                 name="name"
                 type="text"
                 className="popup__field"
                 id="name-field"
                 autoComplete="off"
                 required
                 /*value=""*/
                 minLength="2"
                 maxLength="40"
                 />
                <span className="popup__error name-field-error"></span>
                <input
                 placeholder="Профессия"
                 name="profession"
                 type="text"
                 className="popup__field"
                 id="profession-field"
                 autoComplete="off"
                 required
                 /*value=""*/
                 minLength="2"
                 maxLength="200"
                 />
                <span className="popup__error profession-field-error"></span>
                <button className="popup__button" type="submit">Сохранить</button>
            </>
          </ PopupWithForm>

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
    </div>
            );
}

export default App;
