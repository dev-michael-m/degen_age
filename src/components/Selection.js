import Card from './Card';
import React, {useState, useEffect} from 'react';
import '../stylesheet/Selection.css';
import Logo from '../assets/degen age title GNW skull.png';
import KnightTitle from '../assets/knights title.png';
import GoblinTitle from '../assets/goblins title.png';
import WizardTitle from '../assets/wizards title.png';
import ElfTitle from '../assets/elves title.png';
import { useNavigate } from 'react-router-dom';
import {CHAR_RACES} from '../constants';

const SCREEN_DELAY = 4000; // delay in ms

const Selection = () => {
    const [initScreen, setInitScreen] = useState(true);
    const navigate = useNavigate();

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

    const handleFactionSelect = (_faction) => {
        navigate('/play',{
            state: {
                faction: _faction
            }
        });
    }

    return (
        <div className='select-main'>
            {!initScreen ? <div id="main-select" className='fade-in-slow2 select-wrapper'>
                <h1 className='text-center'>CHOOSE YOUR SIDE</h1>
                <div className='select-cards'>
                    <Card cardStyle="f1" title={WizardTitle} name={CHAR_RACES[1]} onClick={handleFactionSelect} />
                    <Card cardStyle="f3" title={KnightTitle} name={CHAR_RACES[2]} onClick={handleFactionSelect} />
                    <Card cardStyle="f2" title={ElfTitle} name={CHAR_RACES[0]} onClick={handleFactionSelect} />
                    <Card cardStyle="f4" title={GoblinTitle} name={CHAR_RACES[3]} onClick={handleFactionSelect} />
                </div>
            </div> :
            <div className='fade-in-slow sub-select-wrapper flex-just-center'>
                <div>
                    <img src={Logo} width={500}></img>
                </div>
            </div>            
            }
        </div>
    )
}

export default Selection;