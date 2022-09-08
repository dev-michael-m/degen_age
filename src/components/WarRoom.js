import React, {useEffect} from 'react';
import '../stylesheet/WarRoom.css';
import SchillIcon from '../assets/schil token logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import {useSelector} from 'react-redux';
import LockedIcon from '@mui/icons-material/Lock';
import { selectPlayer } from './../store/playerSlice';

const WarRoom = () => {
    const navigate = useNavigate();
    const player = useSelector(selectPlayer);
    const {state} = useLocation();

    useEffect(() => {
        let mounted = true;

        function beforeUnloadListener(event){
            sessionStorage.setItem('reloaded','true');  // set var if player is refreshing
        }
        
        if(mounted){
            const reloaded = sessionStorage.getItem('reloaded');
            
            window.addEventListener('beforeunload',beforeUnloadListener,{capture: true});
            
            if(reloaded){
                // get player data
                sessionStorage.removeItem('reloaded');
            }
        }

        return () => {
            mounted = false;
            window.removeEventListener('beforeunload',beforeUnloadListener,{capture: true});
        }
    },[]);

    const handleBattleSelection = (_stage, _amnt) => {
        navigate('/play/battle/test',{
            state: {
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
                    <div className={`wr-card east-run ${player.tokens && player.tokens >= 500 ? "" : 'locked'}`} id={500} name="east-run" onClick={player.tokens && player.tokens >= 500 ? () => handleBattleSelection('east-run', 500) : null}>
                        <h2>East Run</h2>
                        <div className="flex-align-center">
                            <img style={{marginRight: 8}} src={SchillIcon} width={25}></img>
                            <h3>500</h3>
                        </div>
                        <div style={player.tokens && player.tokens >= 500 ? {display: 'none'} : null} className={player.tokens && player.tokens >= 500 ? '' : 'lock'}>
                            <LockedIcon />
                        </div>
                    </div>
                    <div className={`wr-card kata-rhama ${player.tokens && player.tokens >= 1000 ? "" : 'locked'}`} id={1000} name="kata-rhama" onClick={player.tokens && player.tokens >= 1000 ? () => handleBattleSelection('kata-rhama', 1000) : null}>
                        <h2>K'ata Rhama</h2>
                        <div className="flex-align-center">
                            <img style={{marginRight: 8}} src={SchillIcon} width={25}></img>
                            <h3>1,000</h3>
                        </div>
                        <div style={player.tokens && player.tokens >= 1000 ? {display: 'none'} : null} className={player.tokens && player.tokens >= 1000 ? '' : 'lock'}>
                            <LockedIcon />
                        </div>
                    </div>
                    <div className={`wr-card kings-crossing ${player.tokens && player.tokens >= 2500 ? "" : 'locked'}`} id={2500} name="kings-crossing" onClick={player.tokens && player.tokens >= 2500 ? () => handleBattleSelection('kings-crossing', 2500) : null}>
                        <h2>King's Crossing</h2>
                        <div className="flex-align-center">
                            <img style={{marginRight: 8}} src={SchillIcon} width={25}></img>
                            <h3>2,500</h3>
                        </div>
                        <div style={player.tokens && player.tokens >= 2500 ? {display: 'none'} : null} className={player.tokens && player.tokens >= 2500 ? '' : 'lock'}>
                            <LockedIcon />
                        </div>
                    </div>
                    <div className={`wr-card ivory-hill ${player.tokens && player.tokens >= 5000 ? "" : 'locked'}`} id={5000} name="ivory-hill" onClick={player.tokens && player.tokens >= 5000 ? () => handleBattleSelection('ivory-hill', 5000) : null}>
                        <h2>Ivory Hill</h2>
                        <div className="flex-align-center">
                            <img style={{marginRight: 8}} src={SchillIcon} width={25}></img>
                            <h3>5,000</h3>
                        </div>
                        <div style={player.tokens && player.tokens >= 5000 ? {display: 'none'} : null} className={player.tokens && player.tokens >= 5000 ? '' : 'lock'}>
                            <LockedIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WarRoom;