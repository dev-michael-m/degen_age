import React from 'react';
import '../stylesheet/WarRoom.css';
import { useNavigate, useLocation } from 'react-router-dom';
import LockedIcon from '@mui/icons-material/Lock';

const WarRoom = () => {
    const navigate = useNavigate();
    const {state} = useLocation();

    const handleBattleSelection = () => {
        navigate('/play/battle/test',{
            state: {
                player: state.player
            }
        });
    }

    console.log(state.player.tokens)

    return (
        <div className='warroom-container'>
            <div className='warroom-wrapper'>
                <h1>Select Your Battle</h1>
                <div className='wr-wrapper'>
                    <div className='wr-card' onClick={state.player.tokens && state.player.tokens >= 500 ? handleBattleSelection : null}>
                        <h2>East Run</h2>
                        <h3>500 $SCHIL</h3>
                        <div style={state.player.tokens && state.player.tokens >= 500 ? {display: 'none'} : null} className={state.player.tokens && state.player.tokens >= 500 ? '' : 'lock'}>
                            <LockedIcon />
                        </div>
                    </div>
                    <div className='wr-card kata-rhama' onClick={state.player.tokens && state.player.tokens >= 1000 ? handleBattleSelection : null}>
                        <h2>K'ata Rhama</h2>
                        <h3>1,000 $SCHIL</h3>
                        <div style={state.player.tokens && state.player.tokens >= 1000 ? {display: 'none'} : null} className={state.player.tokens && state.player.tokens >= 1000 ? '' : 'lock'}>
                            <LockedIcon />
                        </div>
                    </div>
                    <div className='wr-card' onClick={state.player.tokens && state.player.tokens >= 2500 ? handleBattleSelection : null}>
                        <h2>King's Crossing</h2>
                        <h3>2,500 $SCHIL</h3>
                        <div style={state.player.tokens && state.player.tokens >= 2500 ? {display: 'none'} : null} className={state.player.tokens && state.player.tokens >= 2500 ? '' : 'lock'}>
                            <LockedIcon />
                        </div>
                    </div>
                    <div className={`wr-card ivory-hill ${state.player.tokens && state.player.tokens >= 5000 ? "" : 'locked'}`} onClick={state.player.tokens && state.player.tokens >= 5000 ? handleBattleSelection : null}>
                        <h2>Ivory Hill</h2>
                        <h3>5,000 $SCHIL</h3>
                        <div style={state.player.tokens && state.player.tokens >= 5000 ? {display: 'none'} : null} className={state.player.tokens && state.player.tokens >= 5000 ? '' : 'lock'}>
                            <LockedIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WarRoom;