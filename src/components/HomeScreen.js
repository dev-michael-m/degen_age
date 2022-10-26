import React, {useState, useEffect} from 'react';
import { CHAR_RACES, LVLS } from '../constants';
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
import AntiFire from '../assets/anti fire potion bottle.png';
import AntiPoison from '../assets/anti poison vial.png';
import AntiShade from '../assets/anti shade potion bottle.png';
import Health from '../assets/health vial.png';
import Logo from '../assets/degen age title GNW skull.png';
import BWLogo from '../assets/degen age logo BNW.jpg';
import Knight from '../assets/knight 4.png';
import Wizard from '../assets/wizard compressed.jpg';
import Elf from '../assets/elf nft.jpg';
import Goblin from '../assets/goblin compressed.jpg';
import Button from '@mui/material/Button';
import '../stylesheet/Bag.css';
import '../stylesheet/Home.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormatNumber, getColorLvl, getPlayerData } from './../utilities/util';
import {useSelector, useDispatch} from 'react-redux';
import Items from './Items';
import env from '../../package.json';
import { selectPlayer, setItems, setPlayerImg, setInit } from './../store/playerSlice';
import PlayingCard from './PlayingCard';
import ElfOverlay from '../assets/cards/card-overlay-elf-silv.png';
import KnightOverlay from '../assets/cards/card-overlay-knight-silv.png';
import WizardOverlay from '../assets/cards/card-overlay-wiz-silv.png';

const $ = require('jquery');

const ITEMS = [
    {
        count: 1,
        img: Health
    },
    {
        count: 2,
        img: AntiPoison
    },
    {
        count: 1,
        img: AntiFire
    },
    {
        count: 3,
        img: AntiShade
    }
]

const HomeScreen = () => {
    const navigate = useNavigate();
    const player = useSelector(selectPlayer);
    const dispatch = useDispatch();
    
    const [headerMsg,setHeaderMsg] = useState(`
        Welcome to Degen Age! The metaverse's first online NFT game...
    `)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [account,setAccount] = useState({});

    useEffect(() => {
        let mounted = true;

        function beforeUnloadListener(event){
            sessionStorage.setItem('reloaded','true');  // set var if player is refreshing
        }

        if(mounted){
            const reloaded = sessionStorage.getItem('reloaded');
            const padd = localStorage.getItem('padd');

            window.addEventListener('beforeunload',beforeUnloadListener,{capture: true});

            const retrieveData = async (_address) => {
                const _query = await getPlayerData(_address);
                // set player data
                if(_query.data && !_query.data.empty){
                    const playerData = _query.data.docs[0].data();
                    
                    dispatch(setInit({  
                        ...playerData,
                        created: playerData.created.seconds,
                        faction: CHAR_RACES[playerData.faction],
                        items: ITEMS
                    }));

                    setAccount({
                        ...playerData,
                        selected: {
                            ...playerData.selected,
                            img: CHAR_RACES[playerData.faction] == CHAR_RACES[1] ? Wizard : CHAR_RACES[playerData.faction] == CHAR_RACES[2] ? Knight : CHAR_RACES[playerData.faction] == CHAR_RACES[0] ? Elf : Goblin
                        }
                    })
                }
            }

            if(reloaded && padd){   // player has requested a page refresh
                sessionStorage.removeItem('reloaded');
                retrieveData(padd)
                .catch(error => console.error(error));
            }else if(!reloaded && padd){    // player has not refreshed page
                sessionStorage.removeItem('reloaded');
                dispatch(setPlayerImg(
                    player.faction == CHAR_RACES[1] ? Wizard : player.faction == CHAR_RACES[2] ? Knight : player.faction == CHAR_RACES[0] ? Elf : Goblin
                ));
    
                setAccount({
                    ...player,
                    selected: {
                        ...player.selected,
                        img: player.faction == CHAR_RACES[1] ? Wizard : player.faction == CHAR_RACES[2] ? Knight : player.faction == CHAR_RACES[0] ? Elf : Goblin
                    }
                })
            }
        }

        return () => {
            mounted = false;
            window.removeEventListener('beforeunload',beforeUnloadListener,{capture: true});
        }
    },[]);

    const onDrawerToggle = () => {
        setDrawerOpen(prevState => !prevState);
    }

    const handleBattle = () => {
        dispatch(setItems(ITEMS));

        navigate('/warroom');
    }

    const handleAccount = () => {
        navigate('/account');
    }

    return (
        <div id="home-container" className={`home-container ${player.faction}`}>
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
                                <a className='drawer-link' id="artist" href="#" onClick={handleBattle}>Battle!</a>
                            </div>
                            <div style={{width: '80%'}} className='flex-align-center side-nav-wrapper'>
                                <AccountIcon style={{marginRight: 20}} />
                                <a className='drawer-link' id="team" href="#" onClick={handleAccount}>Account</a>                             
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
                        <div>
                            <p className='header-msg'>{headerMsg}</p>
                        </div>
                        <div className='flex-just-even' style={{width: 250}}>
                            <div style={{marginRight: 28, width: 80}} id="campaign-points" className='flex-just-even flex-align-center'>
                                <CPIcon style={{color: 'floralwhite', fontSize: 18, marginRight: 8}} />
                                <label className={`top-bar-label-cp ${player.cp >= 1e6 && player.cp < 1e9 ? 'label-green' : player.cp >= 1e9 && player.cp < 1e12 ? 'label-orange' : ''}`}>{FormatNumber(player.cp)}</label>
                            </div>
                            <div style={{width: 80}} id="schills" className='flex-just-even flex-align-center'>
                                <img style={{marginRight: 8}} src={SchillIcon} width={20}></img>
                                <label className={`top-bar-label-sch ${player.tokens >= 1e6 && player.tokens < 1e9 ? 'label-green' : player.tokens >= 1e9 && player.tokens < 1e12 ? 'label-orange' : ''}`}>{FormatNumber(player.tokens)}</label>
                            </div>
                        </div>
                    </div>                    
                </div> 
                <div className='home-primary-container'>
                    <div className='home-primary-wrapper'>
                        <div className='flex-column flex-align-center'>
                            <div>
                                <h2 style={{color: getColorLvl(player.selected ? player.selected.lvl : 0)}}>(Lvl. {player.selected ? player.selected.lvl : 0})</h2>
                            </div>
                            <div className='nft-container'>
                                <PlayingCard 
                                    id="card-left"
                                    card_info={{
                                        src: player.selected && account.selected ? account.selected.img : null,
                                        lvl: player.selected ? player.selected.lvl : 0,
                                        overlay: ElfOverlay,
                                        desc: "Welcome to Degen Age!"
                                    }}                                       
                                />
                                <PlayingCard 
                                    id="card-middle"
                                    card_info={{
                                        src: player.selected && account.selected ? account.selected.img : null,
                                        lvl: player.selected ? player.selected.lvl : 0,
                                        overlay: KnightOverlay,
                                        desc: "There must be some mistake...now you must die!"
                                    }}                                       
                                />
                                <PlayingCard 
                                    id="card-right"
                                    card_info={{
                                        src: player.selected && account.selected ? account.selected.img : null,
                                        lvl: player.selected ? player.selected.lvl : 0,
                                        overlay: WizardOverlay,
                                        desc: "Being degen means showing no mercy to those who supercede you."
                                    }}                                       
                                />
                                    {/* <div className='card-front img-border'>
                                        <img src={player.selected && account.selected ? account.selected.img : null} width={400}></img>                       
                                    </div> 
                                    <div className='card-back'>
                                        <h1 style={{textDecoration: 'underline'}}>STATS</h1>
                                        <div className='text-center'>
                                            <p>Overall: {player.selected ? player.selected.lvl : 0}</p>
                                            <p>Combat Type: {player.selected ? player.selected.combatType : ''}</p>
                                            <p>Strength: {player.selected ? player.selected.str : 0} </p>
                                            <p>Magic: {player.selected ? player.selected.mgc : 0} </p>
                                            <p>Range: {player.selected ? player.selected.rng : 0} </p>
                                            <p>Defense: {player.selected ? player.selected.def : 0} </p>
                                        </div>
                                    </div> */}
                            </div>
                            <div className='spacing-small'>
                                <Button className='primary-white' variant="contained" onClick={handleBattle}>
                                    <div className='flex-align-center'>
                                        <img style={{marginRight: 12}} src={BattleIcon} width={20}></img>
                                        Battle!
                                    </div>
                                </Button>
                            </div>   
                        </div>
                        <Items items={ITEMS} layout="row" />
                    </div>
                </div>
                <label style={{position: 'absolute',right: 0, bottom: 0, zIndex: 100, color: 'white', fontSize: 12, marginRight: 10}}>v{env.version}</label>               
            </div>
        </div>
    )
}

export default HomeScreen;