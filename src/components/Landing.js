import React, {useEffect, useState} from 'react';
import Logo from '../assets/degen age title GNW skull.png';
import Button from '@mui/material/Button';
import BookIcon from '@mui/icons-material/MenuBook';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import '../stylesheet/Landing.css';
import { useNavigate } from 'react-router-dom';

const LORE_LIST = [
  {display: 'Chapt. I - The Origin Story', path: `origins`},
  {display: 'Chapt. II - A Prophecy Untold', path: `prophecy`},
  {display: 'Chapt. III - Rise of the Elven King', path: `elven king`},
  {display: 'Chapt. IV - Ponder of Power', path: `knight king`}
]

const Landing = () => {
    const [open,setOpen] = useState(false);
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

    const onToggleDrawer = () => {
      setOpen(prevState => !prevState);
    }

    const renderList = () => {
      return (
        <List>
          {LORE_LIST.map((text, idx) => (
            <ListItem key={text.path} disablePadding>
              <ListItemButton onClick={() => handleLink(idx)}>
                <ListItemText primary={text.display} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )
    }

    const handleLink = (idx) => {
      navigate(`/lore/${idx}`);
    }

    return (
      <div className="landing-page" id="landing-page">
        <Drawer
          anchor="left"
          open={open}
          onClose={onToggleDrawer}
        >
          {renderList()}
        </Drawer>
        <div className='landing-wrapper'>
          <div style={{position: 'relative',margin: 10}}>
            <div style={{zIndex: 10}}>
              <img src={Logo} width={300} height={300}></img>
            </div>
            <div className='bubble'></div>
          </div>
          <div className='typewriter'>
            <h2>Degens favor the brave!</h2>
          </div>
          <div className='text-center spacing-vsmall' style={{fontStyle: 'italic',lineHeight: 2}}>
            <p>
              There lies a great power within the heart of the citadel.<br></br>
              A power known to rule the world.  Four great factions fight to gain control of the city.<br></br>  
              For power, riches, and glory. These are the Ivory Origins.<br></br>  
              This is Degen Age!
            </p>
          </div>
          <div className='spacing-vsmall'>
            <Button className='primary-white' variant="contained" onClick={onToggleDrawer}>
              <div style={{width: 100}} className="flex-just-around flex-align-center">
                <BookIcon />
                <p style={{margin: 0}}>Lore</p>
              </div>              
            </Button>
          </div>
        </div>
      </div>
    );
}

export default Landing;