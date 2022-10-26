import React from 'react';
import '../stylesheet/PlayingCard.css';

const PlayingCard = ({card_info,id}) => {
    
    return (
        <div id={id} className='playing-card-container card-base-default'>
            <img className='playing-card-overlay' src={card_info.overlay}></img>
            <div className='playing-card-wrapper'>
                <div className='playing-card-lvl'>
                    <label>{card_info.lvl}</label>
                </div>
                <div id="card-img">
                    <img src={card_info.src} width="100%"></img>
                </div>
                <div className="card-details">
                    <p>"{card_info.desc}"</p>
                </div>
            </div>
        </div>
    )
}

export default PlayingCard;