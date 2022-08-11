import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import ReadyIcon from '@mui/icons-material/ThumbUp';
import LinearProgress from '@mui/material/LinearProgress';
import HeartIcon from '@mui/icons-material/Favorite';
import Modal from '@mui/material/Modal';
import GameBG from '../assets/ivory hill.jpg';
import AntiFire from '../assets/anti fire potion bottle.png';
import AntiPoison from '../assets/anti poison potion bottle.png';
import AntiShade from '../assets/anti shade potion bottle.png';
import Health from '../assets/health potion bottle.png';
import '../App.css';
import '../stylesheet/Sections.css';
import '../stylesheet/Game.css';
import { battle, generateCollection, randNum } from '../utilities/mechanics';
import { useNavigate, useLocation } from 'react-router-dom';
import Items from './Items';

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

const Game = ({img,game_id}) => {
    const [gameState,setGameState] = useState(false);
    const [players,setPlayers] = useState({});
    const [winner,setWinner] = useState(false);
    const [loading,setLoading] = useState(true);
    const [collection,setCollection] = useState([]);
    const [prep,setPrep] = useState(false);
    const [pregame,setPregame] = useState(false);
    const [ready,setReady] = useState(false);
    const [modalOpen,setModalOpen] = useState(false);
    const navigate = useNavigate();
    const {state} = useLocation();

    useEffect(() => {
        let mounted = true;

        if(mounted){
            handleCollectionGeneration();
        }

        return () => {
            mounted = false;
        }
    },[]);

    const toggleModal = () => {
      setModalOpen(prevState => !prevState);
    }

    const setPreScreen = (_ms) => {
      return new Promise(async(resolve) => {
        setTimeout(() => {
          resolve(true);
        },_ms);
      })
    }

    const handleGameState = async () => {
        setGameState(true);
        setReady(true);
        setPrep(true);

        await setPreScreen(2500);
        
        setPrep(false);
        setPregame(true);

        await setPreScreen(1500);

        setPregame(false);

        if(Object.keys(players).length){
          const status = await battle(players.p1, players.p2);
          setWinner(status.winner);

          if(status.winner == 1){
            document.getElementById('p2-defeat').style.display = 'block';
          }else{
            document.getElementById('p1-defeat').style.display = 'block';
          }

          toggleModal();
        }    
      }
    
      const handleCollectionGeneration = () => {
        const _collection = generateCollection();
        setCollection(_collection);
        const _p1 = randNum(0,_collection.length);
        const _p2 = randNum(0,_collection.length);
        setPlayers({p1: _collection[_p1], p2: _collection[_p2]});
        setLoading(false);
      }

      const handleGameEnd = () => {
        navigate('/play');
      }

    return (
        <div className="main-container parallax-group">
          <img className='game-bg' src={GameBG} width="100%"></img>
            <div className='inner-main'>
              {loading ?
              <div className='flex-just-center flex-align-center'>
                <p>Connecting to War Room...</p>
                <CircularProgress />
              </div> :
              <div className='flex-align-center flex-just-between' id="game-board">
                <Modal open={modalOpen} onClose={toggleModal} aria-labelledby={winner && winner == 1 ? 'You Won!' : 'You Lost'}>
                  <div className='modal-wrapper'>
                    <h2>Here is some text to display</h2>
                    <Button className='primary-white' variant="contained" onClick={handleGameEnd}>Leave</Button>
                  </div>
                </Modal>
                <Modal open={prep} >
                  <div className='blnk-modal-wrapper'>
                    <h1>The Game is About to Begin</h1>
                  </div>
                </Modal>
                <Modal open={pregame} >
                  <div className='blnk-modal-wrapper'>
                    <h1>Battle!</h1>
                  </div>
                </Modal>
                <div className='flex-align-center flex-column' style={{width: '40%'}}>
                  <div>
                    <h3 style={{color: 'gold'}}>{players.p1.race} (Lvl. {players.p1.overall})</h3>
                  </div>
                  <div className='float-small'>
                    <div className='hit-marker-container-right' id="hit-marker-container">
                      <div><h2 id="hit-marker-p1"></h2></div>
                    </div> 
                    <div className='block-wrapper' style={{display: 'none'}} id="p1-block">
                      <RemoveModeratorIcon className="block-icon" id="block-icon-p1" />
                    </div>
                    <div className='slash-wrapper'>
                      <div id="p1-slash"></div>                      
                    </div>
                    <div className='defeat-wrapper'>
                      <h2 id="p1-defeat">DEFEAT</h2>  
                    </div> 
                    <div id="p1-img-wrapper">
                        <img className='p1-image' id="p1-image" src={players.p1.image} width={400} height={400}></img>                        
                    </div>                  
                  </div>
                  <div className='flex-align-center flex-just-around' style={{width: '75%'}}>
                    <LinearProgress style={{width: '75%'}} id="player1-health" variant='determinate' value={100} />
                    <h3 style={{color: 'springgreen'}} id="player1-health-val">100</h3>
                  </div>  
                  <div>
                    <Items items={ITEMS} layout="col" />  
                  </div>                                  
                </div>
                <div id="gameboard-middle" style={{width: '20%'}}>
                  <div className='log-wrapper'>
                    <textarea className='game-log' id="game-log"></textarea>
                    <div className='fade-overlay'></div>
                  </div>
                  <div className='flex-column flex-just-even flex-align-center'>
                    <h2>{winner === 1 ? `You Won!` : winner === 0 ? `Defeat!` : ""}</h2>
                    {winner ? <Button className='primary-white' variant="contained" onClick={handleGameEnd}>Leave</Button> : null}
                  </div>
                  {!ready ? 
                  <div className='spacer flex-just-even flex-align-center'>
                    <Button className='primary-white' variant="contained" onClick={handleGameState}>
                        <div className='flex-just-even flex-align-center' style={{width: 150}}>
                            <div style={{paddingTop: 4}}>Ready</div>
                            <ReadyIcon />    
                        </div>
                    </Button>
                  </div> : null}
                </div>
                <div className='flex-align-center flex-column' style={{width: '40%'}}>
                  <div>
                      <h3>{players.p2.race} (Lvl. {players.p2.overall})</h3>                                       
                  </div>
                  <div className='float-small-delayed'>
                    <div className='hit-marker-container-left' id="hit-marker-container">
                      <div><h2 id="hit-marker-p2"></h2></div>
                    </div>
                    <div className='block-wrapper' style={{display: 'none'}} id="p2-block">
                      <RemoveModeratorIcon className="block-icon" id="block-icon-p2" />
                    </div>
                    <div className='slash-wrapper'>
                      <div id="p2-slash"></div>
                    </div>
                    <div className='defeat-wrapper'>
                      <h2 id="p2-defeat">DEFEAT</h2>  
                    </div>
                    {!gameState ? <div className='ready-wrapper'>
                      <h2>READY</h2>  
                    </div> : null}
                    <div id="p2-img-wrapper">
                        <img className='p2-image' id="p2-image" src={players.p2.image} width={400} height={400}></img>                        
                    </div>                    
                  </div>
                  <div className='flex-align-center flex-just-around' style={{width: '75%'}}>
                    <h3 style={{color: 'springgreen'}} id="player2-health-val">100</h3>
                    <LinearProgress style={{width: '75%'}} id="player2-health" variant='determinate' value={100} />
                  </div>
                  <div className='spacer'></div>
                </div>
              </div>
              }
            </div>           
          </div>
    )
}

export default Game;