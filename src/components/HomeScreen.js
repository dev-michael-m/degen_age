import React, {useState} from 'react';
import { CHAR_RACES } from '../constants';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Apps';
import IconButton from '@mui/material/IconButton';
import StoreIcon from '@mui/icons-material/Storefront';
import AccountIcon from '@mui/icons-material/AccountCircle';
import FortIcon from '@mui/icons-material/Fort';
import CloseIcon from '@mui/icons-material/Close';
import CPIcon from '@mui/icons-material/Api';
import SchillIcon from '../assets/schil token logo.png';
import BattleIcon from '../assets/swords.png';
import Logo from '../assets/degen age title GNW.png';
import '../stylesheet/Home.css';
import { useLocation } from 'react-router-dom';
import { FormatNumber } from './../utilities/util';

const HomeScreen = () => {
    const {state} = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [account,setAccount] = useState({
        address: null,
        cp: 100,
        schill: 99999,
        race: state.faction
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
                    <div className='flex-just-end'>
                        <IconButton onClick={onDrawerToggle}>
                            <CloseIcon style={{color: 'white'}} />
                        </IconButton>
                    </div>
                    <div className='flex-just-center'>
                        <img src={Logo} width={140}></img>
                    </div>
                    <div className='menu-wrapper'>
                        <div className="menu-list">                            
                            <div style={{width: '80%'}} className='flex-align-center side-nav-wrapper'>
                                <img style={{marginRight: 20, filter: 'brightness(0) invert(1)'}} src={BattleIcon} width={32}></img>
                                <a className='drawer-link' id="artist" href="#">Battle!</a>
                            </div>
                            <div style={{width: '80%'}} className='flex-align-center side-nav-wrapper'>
                                <AccountIcon style={{marginRight: 20}} />
                                <a className='drawer-link' id="team" href="#">Account</a>                             
                            </div>
                            <div style={{width: '80%'}} className='flex-align-center disabled-link'>
                                <FortIcon className='disabled-link' style={{marginRight: 20}} />
                                <a aria-disabled className='drawer-link disabled-link' id="faqs">Campaign</a>
                            </div>
                            <div style={{width: '80%'}} className='flex-align-center disabled-link'>
                                <StoreIcon className='disabled-link' style={{marginRight: 20}} />
                                <a aria-disabled className='drawer-link disabled-link' id="faqs">Marketplace</a>
                            </div>
                        </div>
                    </div>
                </Drawer>
                <div id="top-bar" className='home-top-bar'>
                    <div id="inner-top-bar" className="inner-top-bar flex-just-between flex-align-center">
                        <div style={{marginLeft: 10}}>
                            <IconButton style={{padding: 0}} onClick={onDrawerToggle}>
                                <MenuIcon style={{color: 'whitesmoke', transform: 'rotate(45deg)'}} />
                            </IconButton>
                        </div>
                        <div className='flex-just-even' style={{width: 250}}>
                            <div style={{marginRight: 28, width: 80}} id="campaign-points" className='flex-just-even flex-align-center'>
                                <CPIcon style={{color: 'floralwhite', fontSize: 18, marginRight: 8}} />
                                <label className={`top-bar-label-cp ${account.cp >= 1e6 && account.cp < 1e9 ? 'label-green' : account.cp >= 1e9 && account.cp < 1e12 ? 'label-orange' : ''}`}>{FormatNumber(account.cp)}</label>
                            </div>
                            <div style={{width: 80}} id="schills" className='flex-just-even flex-align-center'>
                                <img style={{marginRight: 8}} src={SchillIcon} width={20}></img>
                                <label className={`top-bar-label-sch ${account.cp >= 1e6 && account.cp < 1e9 ? 'label-green' : account.cp >= 1e9 && account.cp < 1e12 ? 'label-orange' : ''}`}>{FormatNumber(account.schill)}</label>
                            </div>
                        </div>
                    </div>                    
                </div>                
            </div>
        </div>
    )
}

export default HomeScreen;