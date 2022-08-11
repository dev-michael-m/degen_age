import Card from './Card';
import React, {useState, useEffect} from 'react';
import '../stylesheet/Selection.css';
import Logo from '../assets/degen age title GNW skull.png';
import KnightTitle from '../assets/knights title.png';
import GoblinTitle from '../assets/goblins title.png';
import WizardTitle from '../assets/wizards title.png';
import ElfTitle from '../assets/elves title.png';
import {db} from '../firebase/firestore';
import {addDoc,collection, serverTimestamp} from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import {CHAR_RACES} from '../constants';

const SCREEN_DELAY = 4000; // delay in ms

const Selection = () => {
    const [initScreen, setInitScreen] = useState(true);
    const navigate = useNavigate();
    const {state} = useLocation();

    useEffect(() => {
        let mounted = true;

        if(mounted){
            setTimeout(() => {
                setInitScreen(false);
            },SCREEN_DELAY);
        }

        return () => {
            mounted = false;
        }
    },[]);

    const handleFactionSelect = async (_faction) => {
        // add new player to db
        const ref = collection(db, 'players');
        const playerData = {
            address: state.address,
            cp: 0,
            created: serverTimestamp(),
            faction: _faction,
            faction_selected: true,
            games_lost: 0,
            games_won: 0,
            online: true,
            selected_char: 0,
            time_played: 0,
            tokens: 0,
            total_cp: 0,
            total_earned: 0,
            user_name: ""
        }

        // set in redux as well****
        addDoc(ref,playerData).then(res => {
            if(res.id){
                const _faction = CHAR_RACES[playerData.faction];
                navigate('/play',{
                    state: {
                        player: {
                            ...playerData,
                            faction: _faction
                        }
                    }
                });
            }
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='select-main'>
            {!initScreen ? <div id="main-select" className='fade-in-slow2 select-wrapper'>
                <h1 className='text-center'>CHOOSE YOUR SIDE</h1>
                <div className='select-cards'>
                    <Card cardStyle="f1" title={WizardTitle} name={1} onClick={handleFactionSelect} />
                    <Card cardStyle="f3" title={KnightTitle} name={2} onClick={handleFactionSelect} />
                    <Card cardStyle="f2" title={ElfTitle} name={3} onClick={handleFactionSelect} />
                    <Card cardStyle="f4" title={GoblinTitle} name={4} onClick={handleFactionSelect} />
                </div>
            </div> :
            <div className='fade-in-slow sub-select-wrapper flex-just-center'>
                <div className='cracked'></div>
            </div>            
            }
        </div>
    )
}

export default Selection;