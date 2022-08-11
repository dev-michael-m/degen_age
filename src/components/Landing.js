import React, {useEffect} from 'react';
import Logo from '../assets/degen age logo BNW.jpg';
import Button from '@mui/material/Button';
import '../stylesheet/Landing.css';
import {db} from '../firebase/firestore';
import {collection, query, where, getDocs, doc} from 'firebase/firestore';
import { ConnectWallet } from '../utilities/util';
import { useNavigate } from 'react-router-dom';
import { CHAR_RACES } from './../constants';

const Landing = () => {

  const navigate = useNavigate();

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
          const _query = await getDocs(query(collection(db, 'players'), where("address","==",res.address)));
          
          if(_query.empty){ // player does not exist
            // new player
            navigate('/select', {state: {address: res.address}});
          }else{
            const playerData = _query.docs[0].data();
            
            navigate('/play', {
              state: {
                player: {
                  ...playerData,
                  faction: CHAR_RACES[playerData.faction]
                }
              }
            })
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
          <div style={{margin: 40}}>
            <Button className='primary-white' variant="contained" onClick={onConnect}>Play</Button>
          </div>
        </div>
      </div>
    );
}

export default Landing;