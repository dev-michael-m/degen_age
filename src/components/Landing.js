import React, {useEffect} from 'react';
import Logo from '../assets/degen age logo BNW.jpg';
import '../stylesheet/Landing.css';

const Landing = () => {

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
            <h2>EAP Minting August 12th!</h2>
          </div>
        </div>
      </div>
    );
}

export default Landing;