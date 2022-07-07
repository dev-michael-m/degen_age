import React from 'react';
import '../stylesheet/Card.css';
import Button from '@mui/material/Button';
import { FormatNumber } from '../utilities/util';
import Logo from '../assets/degen age vector black.jpg';

const ItemCard = ({children, price = "", amount = "", bestValue = false, selected = false, color = ""}) => {
    return (
        <div className={`item-card ${selected ? 'card-selected' : ''} ${color ? `${color}` : ''}`}>
            {bestValue ? 
            <div className='value-wrapper'>                
                <div className='value-item'>
                    <label>Best Value!</label>
                </div>
            </div> : null}
            <div className='card-wrapper'>
                <div>
                    <h2>{price} Ξ</h2>
                </div>
                <div>
                    <div>
                        <img src={Logo} width={136}></img>
                    </div>
                    <div>
                        <p>{FormatNumber(amount)} $SCHIL</p>
                    </div>
                </div>
                <div>
                    <Button className='purchase-primary' variant="contained" size="medium">Purchase</Button>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;