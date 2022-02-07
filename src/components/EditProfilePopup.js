import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpened, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    //console.log(name)

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    /*function handleChange(e) {
        const target = e.target;
        const value = e.target.value

        target.name === 'name' ? setName(value) : setDescription(value)
    }*/

    function handleChangeName(e) {
        //console.log(e.target.value)
        setName(e.target.value);
        //console.log(e.target.value)
    };

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();

        onUpdateUser({
            name,
            about: description,
          });
    }

    return (
        <PopupWithForm
        name={'edit'}
        title={'Редактировать профиль'}
        isOpened={isOpened}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
        <>
        <input
             placeholder="Имя"
             name="name"
             type="text"
             className="popup__field"
             id="name-field"
             autoComplete="off"
             required
             value={name}
             onChange={handleChangeName}
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
             value={description}
             onChange={handleChangeDescription}
             minLength="2"
             maxLength="200"
             />
            <span className="popup__error profession-field-error"></span>
            <button className="popup__button" type="submit">Сохранить</button>
        </>
      </ PopupWithForm> 
    );   
  }
  
  export default EditProfilePopup;