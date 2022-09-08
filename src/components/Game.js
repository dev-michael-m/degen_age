import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import ReadyIcon from '@mui/icons-material/ThumbUp';
import LinearProgress from '@mui/material/LinearProgress';
import HeartIcon from '@mui/icons-material/Favorite';
import Modal from '@mui/material/Modal';
import SchillIcon from '../assets/schil token logo.png';
import IH from '../assets/ivory hill.jpg';
import EastRun from '../assets/east run wr.jpg';
import KR from '../assets/kata rhama.jpg';
import KingsCross from '../assets/kings crossing wr.jpg';
import BattleIcon from '../assets/swords.png';
import CPIcon from '@mui/icons-material/Api';
import '../App.css';
import '../stylesheet/Sections.css';
import '../stylesheet/Game.css';
import { battle, generateCollection, randNum } from '../utilities/mechanics';
import { useNavigate, useLocation } from 'react-router-dom';
import Items from './Items';
import { FormatNumber } from '../utilities/util';
import { useSelector } from 'react-redux';
import { selectPlayer } from '../store/playerSlice';

const CP = 2;
const MINS = 2;
const FAIL_STATE = -999;

const Game = ({img,game_id}) => {
    const [gameState,setGameState] = useState(false); // if state is < 0, player took to long to ready up
    const [players,setPlayers] = useState({});
    const [winner,setWinner] = useState(false);
    const [loading,setLoading] = useState(true);
    const [collection,setCollection] = useState([]);
    const [prep,setPrep] = useState(false);
    const [pregame,setPregame] = useState(false);
    const [ready,setReady] = useState(false);
    const [modalOpen,setModalOpen] = useState(false);
    const navigate = useNavigate();
    const player = useSelector(selectPlayer);
    const {state} = useLocation();

    useEffect(() => {
        let mounted = true;

        if(mounted){
          setTimeout(() => {
            handleCollectionGeneration();
            handleTimerStart();
          },2000);
        }

        return () => {
            mounted = false;
        }
    },[]);

    const handleTimerStart = () => {
      const countDown = new Date();
      countDown.setMinutes(countDown.getMinutes() + MINS);
      let colored = false;

      let timer = setInterval(() => {
        const now = new Date().getTime();

        const distance = countDown.getTime() - now;

        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('timer').innerHTML = `${mins}:${secs.toString().padStart(2,'0')}`;

        if(ready){
          clearInterval(timer);
        }

        if(distance < 0){
          clearInterval(timer);
          setGameState(FAIL_STATE);
          document.getElementById('timer').innerHTML = `Time's Up!`;
        }

        if(distance < 60000 && !colored){
          document.getElementById('timer').style.color = 'red';
        }
      }, 1000);
    }

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
          const status = await battle(player, players.p2);
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
        const _balance = player.tokens + (winner == 1 ? state.pool : (state.pool * -1));
        navigate('/play', {
          state: {
            player: {
              ...player,
              tokens: _balance,
              cp: player.cp + winner == 1 ? CP : 0
            },
            items: state.items
          }
        });
      }

    return (
        <div className="main-container parallax-group">
          <img className='game-bg' src={state.stage == 'ivory-hill' ? IH : state.stage == 'east-run' ? EastRun : state.stage == 'kings-crossing' ? KingsCross : KR} width="100%"></img>
            <div className='inner-main'>
              {loading ?
              <div style={{height: '100%'}} className='flex-just-center flex-align-center flex-column'>
                <h1>Connecting to War Room...</h1>
                <CircularProgress style={{color: '#f5deb3'}} />
              </div> :
              <div className='flex-align-center flex-just-between' id="game-board">
                <Modal open={modalOpen} onClose={toggleModal} aria-labelledby={winner && winner == 1 ? 'You Won!' : 'You Lost'}>
                  <div className='modal-wrapper'>
                    <h1 style={winner == 1 ? {color: 'green'} : {color: 'red'}}>{winner == 1 ? `You Won!` : `Defeat`}</h1>
                    <h2>{winner == 1 ? `Your Faction Will be Pleased` : `Defeat is unacceptable`}</h2>
                    {winner == 1 ? <div style={{width: '100%'}} className='flex-align-center flex-just-even'>
                      <div className="flex-align-center">
                        <CPIcon style={{fontSize: 40, marginRight: 8}} />
                        <h1>{CP}</h1>
                      </div>
                      <div className="flex-align-center">
                          <img style={{marginRight: 8, filter: 'invert(1)'}} src={SchillIcon} width={40}></img>
                          <h1 style={{color: 'green'}}>{`+${FormatNumber(state.pool)}`}</h1>
                      </div>
                    </div> :
                    <div style={{width: '100%'}} className='flex-align-center flex-just-even'>
                      <div className="flex-align-center">
                        <CPIcon style={{fontSize: 40, marginRight: 8}} />
                        <h1>0</h1>
                      </div>
                      <div className="flex-align-center">
                          <img style={{marginRight: 8, filter: 'invert(1)'}} src={SchillIcon} width={40}></img>
                          <h1 style={{color: 'red'}}>{`-${FormatNumber(state.pool)}`}</h1>
                      </div>
                    </div>                    
                    }
                    <div className='spacing-small'>
                      <Button className='primary-wheat' variant="contained" onClick={handleGameEnd}>Home</Button>
                    </div>
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
                    <img style={{filter: 'brightness(0) invert(1)'}} src={BattleIcon} width={64}></img>
                  </div>
                </Modal>
                <div className='flex-align-center flex-column' style={{width: '40%'}}>
                  <div className='text-center'>
                    <h3 style={{color: 'gold'}}>{player.user_name}</h3>
                    <h3 style={{color: 'gold'}}>(Lvl. {player.selected.lvl})</h3>
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
                        <img className='p1-image' id="p1-image" src={player.selected.img} width={400} height={400}></img>                        
                    </div>                  
                  </div>
                  <div className='flex-align-center flex-just-around' style={{width: '75%'}}>
                    <LinearProgress style={{width: '75%'}} id="player1-health" variant='determinate' value={100} />
                    <h3 style={{color: 'springgreen'}} id="player1-health-val">100</h3>
                  </div>  
                  <div>
                    <Items items={player.items} layout="col" />  
                  </div>                                  
                </div>
                <div id="gameboard-middle" style={{width: '20%'}}>
                  <div className='log-wrapper'>
                    <textarea className='game-log' id="game-log"></textarea>
                    <div className='fade-overlay'></div>
                  </div>
                  {!ready ? <div>
                    <p className='timer' id="timer"></p>
                  </div> : null}
                  <div className='flex-column flex-just-even flex-align-center'>
                    <h2>{winner === 1 ? `You Won!` : winner === 0 ? `Defeat!` : ""}</h2>
                    {winner ? <Button className='primary-white' variant="contained" onClick={handleGameEnd}>Home</Button> : null}
                  </div>
                  {!ready ? 
                  <div className='spacer-top flex-just-even flex-align-center'>
                    <Button className='primary-white' variant="contained" onClick={handleGameState}>
                        <div className='flex-just-even flex-align-center' style={{width: 150}}>
                            <div style={{paddingTop: 4}}>Ready</div>
                            <ReadyIcon />    
                        </div>
                    </Button>
                  </div> : null}
                </div>
                <div className='flex-align-center flex-column' style={{width: '40%'}}>
                  <div className='text-center'>
                      <h3>{`FluffyDemon9`}</h3>
                      <h3>(Lvl. {players.p2.overall})</h3>                                       
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
                        <img className='p2-image' id="p2-image" src={players.p2.selected.img} width={400} height={400}></img>                        
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