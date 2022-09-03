import React from 'react';
import '../stylesheet/WarRoom.css';
import SchillIcon from '../assets/schil token logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import LockedIcon from '@mui/icons-material/Lock';

const WarRoom = () => {
    const navigate = useNavigate();
    const {state} = useLocation();

    const handleBattleSelection = (_stage, _amnt) => {
        navigate('/play/battle/test',{
            state: {
                player: state.player,
                items: state.items,
                pool: _amnt,
                stage: _stage
            }
        });
    }

    return (
        <div className='warroom-container'>
            <div className='warroom-wrapper'>
                <h1>Select Your Battle</h1>
                <div className='wr-wrapper'>
                    <div className={`wr-card east-run ${state.player.tokens && state.player.tokens >= 500 ? "" : 'locked'}`} id={500} name="east-run" onClick={state.player.tokens && state.player.tokens >= 500 ? () => handleBattleSelection('east-run', 500) : null}>
                        <h2>East Run</h2>
                        <div className="flex-align-center">
                            <img style={{marginRight: 8}} src={SchillIcon} width={25}></img>
                            <h3>500</h3>
                        </div>
                        <div style={state.player.tokens && state.player.tokens >= 500 ? {display: 'none'} : null} className={state.player.tokens && state.player.tokens >= 500 ? '' : 'lock'}>
                            <LockedIcon />
                        </div>
                    </div>
                    <div className={`wr-card kata-rhama ${state.player.tokens && state.player.tokens >= 1000 ? "" : 'locked'}`} id={1000} name="kata-rhama" onClick={state.player.tokens && state.player.tokens >= 1000 ? () => handleBattleSelection('kata-rhama', 1000) : null}>
                        <h2>K'ata Rhama</h2>
                        <div className="flex-align-center">
                            <img style={{marginRight: 8}} src={SchillIcon} width={25}></img>
                            <h3>1,000</h3>
                        </div>
                        <div style={state.player.tokens && state.player.tokens >= 1000 ? {display: 'none'} : null} className={state.player.tokens && state.player.tokens >= 1000 ? '' : 'lock'}>
                            <LockedIcon />
                        </div>
                    </div>
                    <div className={`wr-card kings-crossing ${state.player.tokens && state.player.tokens >= 2500 ? "" : 'locked'}`} id={2500} name="kings-crossing" onClick={state.player.tokens && state.player.tokens >= 2500 ? () => handleBattleSelection('kings-crossing', 2500) : null}>
                        <h2>King's Crossing</h2>
                        <div className="flex-align-center">
                            <img style={{marginRight: 8}} src={SchillIcon} width={25}></img>
                            <h3>2,500</h3>
                        </div>
                        <div style={state.player.tokens && state.player.tokens >= 2500 ? {display: 'none'} : null} className={state.player.tokens && state.player.tokens >= 2500 ? '' : 'lock'}>
                            <LockedIcon />
                        </div>
                    </div>
                    <div className={`wr-card ivory-hill ${state.player.tokens && state.player.tokens >= 5000 ? "" : 'locked'}`} id={5000} name="ivory-hill" onClick={state.player.tokens && state.player.tokens >= 5000 ? () => handleBattleSelection('ivory-hill', 5000) : null}>
                        <h2>Ivory Hill</h2>
                        <div className="flex-align-center">
                            <img style={{marginRight: 8}} src={SchillIcon} width={25}></img>
                            <h3>5,000</h3>
                        </div>
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