import React from 'react';
import '../stylesheet/Card.css';

const Card = ({desc,name,title,cardStyle,onClick}) => {

    const handleCardSelect = () => {
        onClick(name);
    }

    return (
        <div className={`item-card faction ${cardStyle}`} onClick={handleCardSelect}>
            <div className='card-wrapper'>
                <img src={title} width={200} height={100}></img>
                <div>
                    <p>{desc}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;