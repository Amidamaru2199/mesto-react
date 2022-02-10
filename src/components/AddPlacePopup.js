import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isOpened, onClose, onUpdatePlace}) {
    
    return (
        <PopupWithForm 
        name={'card'} 
        title={'Новое место'} 
        isOpened={isOpened} 
        onClose={onClose}>
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
    );   
  }
  
  export default AddPlacePopup ;