import React from 'react';
import '../stylesheet/Card.css';
import Tooltip from '@mui/material/Tooltip';

const Card = ({ability,desc,name,title,cardStyle,onClick}) => {

    const handleCardSelect = () => {
        onClick(name);
    }

    return (
        <div className={`item-card faction ${cardStyle}`} onClick={handleCardSelect}>
            <div className='card-wrapper'>
                <img src={title} width={200} height={100}></img>
                <div>
                    <Tooltip title={`Ability: ${desc}`}>
                        <img className='char-ability' src={ability}></img>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default Card;