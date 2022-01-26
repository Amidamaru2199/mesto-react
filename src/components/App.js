//import logo from '../images/Vector.svg';
import '../index.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import react from 'react';
import { useState } from 'react';

function App() {

  const [profilePopup, setProfilePopup] = useState(true);
  const [avatarPopup, setAvatarPopup] = useState(true);
  const [addPopup, setAddPopup] = useState(true);

  function handleEditProfileClick() {
    setProfilePopup(true);
    
    if (profilePopup) {
      document.querySelector('.popup_type_edit').classList.add('popup_is-opened')
    } else {
      document.querySelector('.popup_type_edit').classList.remove('popup_is-opened')
    }
      
  }

  function handleEditAvatarClick() {
    setAvatarPopup(true);
    
    if (avatarPopup) {
      document.querySelector('.popup_type_avatar').classList.add('popup_is-opened')
    } else {
      document.querySelector('.popup_type_avatar').classList.remove('popup_is-opened')
    }
      
  }

  function handleAddPlaceClick() {
    setAddPopup(true);
    
    if (avatarPopup) {
      document.querySelector('.popup_type_card').classList.add('popup_is-opened')
    } else {
      document.querySelector('.popup_type_card').classList.remove('popup_is-opened')
    }
      
  }

  return (
    <div className="App">
      <div className="page">
        <div className="container page__container">
          
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAvatarProfile={handleEditAvatarClick}
            onAddProfile={handleAddPlaceClick}
          />

          <Footer />
              
          <div className="popup popup_type_edit">
            <div className="popup__container">
              <h2 className="popup__title">Редактировать профиль</h2>
              <form name="edit-form" className="popup__form" noValidate>
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
              </form>
              <button type="button" className="popup__close-button"></button>
            </div>
          </div>
                
          <div className="popup popup_type_card">
            <div className="popup__container">
              <h2 className="popup__title">Новое место</h2>
              <form name="add-form" className="popup__form" noValidate>
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
              </form>
              <button type="button" className="popup__close-button"></button>
            </div>
          </div>

          <div className="popup popup_type_confirm">
            <div className="popup__container">
              <h2 className="popup__title">Вы уверены?</h2>
              <form name="confirm-form" className="popup__form" noValidate>
                <button className="popup__button" type="submit">Да</button>
              </form>
              <button type="button" className="popup__close-button"></button>
            </div>
          </div>

          <div className="popup popup_type_avatar">
            <div className="popup__container">
              <h2 className="popup__title">Обновить аватар</h2>
              <form name="avatar-form" className="popup__form" noValidate>
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
              </form>
              <button type="button" className="popup__close-button"></button>
            </div>
          </div>

          <div className="popup popup-image">
            <div className="popup-image__containers">
              <img className="popup-image__img" />
              <h3 className="popup-image__text"></h3>
              <button type="button" className="popup__close-button"></button>
            </div>
          </div>

          <template className="item_template">
            <li className="element elements__element">
              <button className="element__delete-button"></button>
              <img className="element__image" />
              <div className="element__text-info">
                <h2 className="element__text"></h2>
                <div className="element__container">
                  <button type="button" className="element__vector"></button>
                  <p className="element__likes"></p>
                </div>
              </div>
            </li>
          </template>
        </div>
      </div>
    </div>
            );
}

export default App;
