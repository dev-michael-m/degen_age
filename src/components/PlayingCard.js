import React from 'react';
import '../stylesheet/PlayingCard.css';

const PlayingCard = ({card_info,id,size,hidden,className,hover}) => {
    
    return (
        <div id={id} className={`playing-card-container ${hover ? hover : ""} ${className ? className : ""} ${hidden ? 'card-base-back' : 'card-base-default'} ${size ? size : ""}`}>
            {!hidden ? <div className={`playing-card-wrapper ${size ? size : ""}`}>
                <div id="card-img">
                    <img src={card_info.src} width="100%"></img>
                </div>
            </div> : null}
        </div>
    )
}

export default PlayingCard;