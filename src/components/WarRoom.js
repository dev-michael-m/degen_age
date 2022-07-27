import React from 'react';
import '../stylesheet/WarRoom.css';

const WarRoom = () => {
    return (
        <div className='warroom-container'>
            <div className='warroom-wrapper'>
                <h1>Select Your Battle</h1>
                <div className='wr-wrapper'>
                    <div className='wr-card'>
                        <h2>East Run</h2>
                        <h3>500 $SCHIL</h3>
                    </div>
                    <div className='wr-card kata-rhama'>
                        <h2>K'ata Rhama</h2>
                        <h3>1,000 $SCHIL</h3>
                    </div>
                    <div className='wr-card'>
                        <h2>King's Crossing</h2>
                        <h3>2,500 $SCHIL</h3>
                    </div>
                    <div className='wr-card ivory-hill'>
                        <h2>Ivory Hill</h2>
                        <h3>5,000 $SCHIL</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WarRoom;