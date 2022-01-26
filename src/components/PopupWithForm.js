function PopupWithForm({title, name}) {
    return (
        <div className={`popup popup_type_${props.name}`}>
            <div className="popup__container">
              <h2 className="popup__title">{props.title}</h2>
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
    )
}