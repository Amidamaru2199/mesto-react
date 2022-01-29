import React from "react"


function Card({card, onCardC}) {

    function handleClick() {
        onCardC(card)
        console.log(card)
    };

    return (
        <li className="element elements__element">
            <button className="element__delete-button" />
            <img className="element__image" src={card.src} alt={card.title} onClick={handleClick}/>
            <div className="element__text-info">
                <h2 className="element__text">{card.title}</h2>
                <div className="element__container">
                    <button type="button" className="element__vector"></button>
                    <p className="element__likes">{card.likes}</p>
                </div>
            </div>
        </li>
    )
}

export default Card