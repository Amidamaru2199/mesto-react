import react from "react";
import { useState } from "react";
import javIv from '../images/image.jpg'

function Main(props) {



    return (
      
        <main>
            <section className="profile container__profile">
              <div className="profile__info">
                <img className="profile__image" src={javIv} alt="Лого" />
                <button className="profile__pen" onClick={props.onAvatarProfile} />
                <div className="profile__text">
                  <div className="profile__title">
                    <h1 className="profile__name">Загрузка...</h1>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                  </div>
                  <p className="profile__description">Загрузка...</p>
                </div>
              </div>
              <button type="button" className="profile__add-button" onClick={props.onAddProfile}></button>
            </section>
                <ul className="elements container__elements">

                </ul>
          </main>
      
              );
  }
  
  export default Main;