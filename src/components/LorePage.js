import React, {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {LORE} from '../lore';
import Button from '@mui/material/Button';
import BookIcon from '@mui/icons-material/MenuBook';
import HomeIcon from '@mui/icons-material/Home';
import Logo from '../assets/degen age title GNW skull.png';
import '../stylesheet/Lore.css';

const LorePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        if(mounted){
            if(!LORE[id]){
                console.log('lore does not exist');
            }
        }

        return () => {
            mounted = false;
        }
    },[]);

    const navigateHome = () => {
        navigate('/');
    }

    const navigateNext = () => {
        navigate(`/lore/${parseInt(id)+1}`);
    }

    return (
        <div className="lore-wrapper">
            <h1 className='text-center'>{LORE[id].title}</h1>
            <div className='flex-just-center spacing-small'>
                <img src={LORE[id].img} width={LORE[id].size ? LORE[id].size : '90%'}></img>
            </div>
            <p>{LORE[id].text}</p>
            <div className='flex-just-center spacing-small'>
                <img src={Logo} width={200}></img>
            </div>
            <div className='flex-align-center flex-just-even'>
                <Button className='primary-white' variant="contained" onClick={navigateHome}>
                    <div style={{width: 100}} className="flex-just-around flex-align-center">
                        <HomeIcon />
                        <p style={{margin: 0}}>Home</p>
                    </div>
                </Button>
                {id != LORE.length - 1 ? <Button className='primary-white' variant="contained" onClick={navigateNext}>
                    <div style={{width: 100}} className="flex-just-around flex-align-center">
                        <BookIcon />
                        <p style={{margin: 0}}>Next</p>
                    </div>
                </Button> : null}
            </div>
        </div>
    )
}

export default LorePage;