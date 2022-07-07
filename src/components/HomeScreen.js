import React, {useState} from 'react';
import { CHAR_RACES } from '../constants';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import CPIcon from '@mui/icons-material/Api';
import SchillIcon from '@mui/icons-material/CurrencyLira';
import '../stylesheet/Home.css';

const HomeScreen = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [account,setAccount] = useState({
        address: null,
        cp: 200,
        schill: 10000,
        race: CHAR_RACES[0]
    })

    const onDrawerToggle = () => {
        setDrawerOpen(prevState => !prevState);
    }

    return (
        <div id="home-container" className={`home-container ${account.race}`}>
            <div id="home-inner-container" className='home-inner-container'>
                <Drawer
                    anchor='left'
                    open={drawerOpen}
                    onClose={onDrawerToggle}
                    hideBackdrop
                    className='main-drawer'
                >
                    <div className="menu-list">
                        <a className='drawer-link' id="artist" href="#">The Artist</a>
                        <a className='drawer-link' id="team" href="#">The Team</a>                             
                        <a className='drawer-link' id="faqs" href="#">FAQs</a>
                    </div>
                </Drawer>
                <div id="top-bar" className='home-top-bar'>
                    <div id="inner-top-bar" className="inner-top-bar flex-just-between flex-align-center">
                        <div>
                            <IconButton style={{padding: 0}} onClick={onDrawerToggle}>
                                <MenuIcon style={{color: 'whitesmoke'}} />
                            </IconButton>
                        </div>
                        <div className='flex-just-even' style={{width: 250}}>
                            <div style={{marginRight: 28, width: 80}} id="campaign-points" className='flex-just-even flex-align-center'>
                                <CPIcon style={{color: 'floralwhite', fontSize: 18}} />
                                <label className='top-bar-label'>{account.cp}</label>
                            </div>
                            <div style={{width: 80}} id="schills" className='flex-just-even flex-align-center'>
                                <SchillIcon style={{color: 'floralwhite', fontSize: 18}} />
                                <label className='top-bar-label'>{account.schill}</label>
                            </div>
                        </div>
                    </div>                    
                </div>                
            </div>
        </div>
    )
}

export default HomeScreen;