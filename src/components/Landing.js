import React, {useEffect} from 'react';
import Logo from '../assets/degen age logo BNW.jpg';
import Button from './Button';
import '../stylesheet/Landing.css';
import {db} from '../firebase/firestore';
import {collection, query, where, getDocs, doc} from 'firebase/firestore';
import { ConnectWallet, getPlayerData } from '../utilities/util';
import { useNavigate } from 'react-router-dom';
import { CHAR_RACES } from './../constants';
import {useDispatch} from 'react-redux';
import {setInit} from '../store/playerSlice';

const Landing = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

    useEffect(() => {
        console.log(`


\\\\               //       ||
 \\\\             //        ||
  \\\\    //\\    //         ||
   \\\\  // \\\\  //          ||
    \\\\//   \\\\//           ||
     \\\/     \\/            |||||||||
     
        You sneaky degen ;)\n\nSnapshot this message and send us a DM to claim your WL spot! https://twitter.com/DegenAgeNFT`)
    },[]);

    const onConnect = () => {
      ConnectWallet().then(async (res) => {
        if(res.status && res.status == 'success'){  // must determine if this is returning player or not
          const _query = await getPlayerData(res.address);
          
          if(_query.data && _query.data.empty){ // player does not exist
            // new player
            navigate('/select', {state: {address: res.address}});
          }else{  // existing player
            localStorage.setItem('padd',res.address); // HIGH RISK: need to make sure that this is secure upon refresh
            const playerData = _query.data.docs[0].data();
            dispatch(setInit({  
              ...playerData,
              created: new Date().getTime(),
              faction: CHAR_RACES[playerData.faction]
            }));

            navigate('/play');
          }          
        }
      }).catch(error => {
        console.error(error);
      })
    }

    return (
      <div className="landing-page" id="landing-page">
        <div className='landing-wrapper'>
          <div style={{position: 'relative',margin: 40}}>
            <div style={{zIndex: 10}}>
              <img src={Logo} width={200} height={200}></img>
            </div>
            <div className='bubble'></div>
          </div>
          <div className='typewriter'>
            <h2>Are you ready?</h2>
          </div>
          <div className='spacing-small' style={{margin: 40}}>
            <Button onClick={onConnect}>play degen age</Button>
          </div>
        </div>
      </div>
    );
}

export default Landing;