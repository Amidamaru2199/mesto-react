import React, { useState , useEffect } from "react";
import { api } from "../utils/Api";
import Card from "./Card";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [cards, setCards] = useState([]);
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    api.getUserInfo()
    .then(profileData => {
      setUserName(profileData.name)
      setUserDescription(profileData.about)
      setUserAvatar(profileData.avatar)
    })
    .catch((err) => console.log(err))

    api.getInitialCards()
    .then(cardData => {
      setCards(cardData.map((item => ({
        id: item._id,
        src: item.link,
        title: item.name,
        likes: item.likes.length
      }))))
    })
    .catch((err) => console.log(err))
  }, [])


    return (
      
        <main>
            <section className="profile container__profile">
              <div className="profile__info">
                <img className="profile__image" src={userAvatar} alt="Лого" />
                <button className="profile__pen" onClick={onEditAvatar} />
                <div className="profile__text">
                  <div className="profile__title">
                    <h1 className="profile__name">{userName}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                  </div>
                  <p className="profile__description">{userDescription}</p>
                </div>
              </div>
              <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
                <ul className="elements container__elements">
                  {
                    cards.map((card) => <Card key={card.id} card={card} onCardClick={onCardClick} />)
                  }
                </ul>
          </main>
      
              );
  }
  
  export default Main;