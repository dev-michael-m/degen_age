import React from 'react';
import ItemCard from './ItemCard';
import '../stylesheet/Marketplace.css';

const Marketplace = () => {
    return (
        <div className='marketplace'>
            <div className='marketplace-wrapper'>
                <ItemCard price="0.15" amount="1500" color='purple-pink-bg' />
                <ItemCard price="0.41" amount="5000" bestValue selected color="purple-pink-bg" />
                <ItemCard price="1" amount="10000" color='purple-pink-bg' />
            </div>
        </div>
    )
}

export default Marketplace;