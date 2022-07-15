import React, {useEffect} from 'react';
import Logo from '../assets/degen age logo BNW.jpg';
import Button from '@mui/material/Button';
import '../stylesheet/Landing.css';
import { ConnectWallet } from '../utilities/util';
import { useNavigate } from 'react-router-dom';

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
      ConnectWallet().then(res => {
        if(res.status && res.status == 'success'){  // must determine if this is returning player or not
          navigate('/select');
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