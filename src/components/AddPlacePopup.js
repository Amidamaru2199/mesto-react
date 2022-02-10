import React, { useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext1 } from '../contexts/CurrentUserContext';

function AddPlacePopup ({isOpened, onClose, onAddPlace}) {
  const cards = useContext(CurrentUserContext1);

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
};

function handleChangeLink(e) {
    setLink(e.target.value);
};

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name,
      link: link
    })
  };

  useState(() => {
    setName('');
    setName('');
  }, [cards])


    
    return (
        <PopupWithForm 
        name={'card'} 
        title={'Новое место'} 
        isOpened={isOpened} 
        onClose={onClose}
        onSubmit={handleSubmit}
        >
            <>
            <input
                 placeholder="Название"
                 name="name"
                 type="text"
                 className="popup__field"
                 id="title-field"
                 autoComplete="off"
                 required
                 value={name}
                 onChange={handleChangeName}
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
                 value={link}
                 onChange={handleChangeLink}
                 />
                <span className="popup__error link-field-error"></span>
                <button className="popup__button" type="submit">Сохранить</button>
            </>
          </ PopupWithForm>
    );   
  }
  
  export default AddPlacePopup ;