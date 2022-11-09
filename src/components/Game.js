import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ActionButton from '../components/Button';
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
import PlayingCard from './PlayingCard';
import Card1 from '../assets/cards/elven mercenary card.png';
import Card2 from '../assets/cards/knight king reynar card.png';
import Card3 from '../assets/cards/malevolent elf card.png';
import Card4 from '../assets/cards/the golden palidin card.png';
import Card5 from '../assets/cards/the kings guard card.png';

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
    let timer;

    useEffect(() => {
      (async () => {
        await handleSleep();
      })();
        
      // const countDown = new Date();
      // countDown.setMinutes(countDown.getMinutes() + MINS);
      // let colored = false;

      // timer = setInterval(() => {
      //   console.log("calling interval");
      //   const now = new Date().getTime();

      //   const distance = countDown.getTime() - now;

      //   const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      //   const secs = Math.floor((distance % (1000 * 60)) / 1000);

      //   document.getElementById("timer").innerHTML = `${mins}:${secs
      //     .toString()
      //     .padStart(2, "0")}`;

      //   if (ready) {
      //     console.log("clearing timer");
      //     clearInterval(timer);
      //   }

      //   if (distance < 0 && !ready) {
      //     console.log("inside distance");
      //     clearInterval(timer);
      //     setGameState(FAIL_STATE);
      //     document.getElementById("timer").innerHTML = `Time's Up!`;
      //   }

      //   if (distance < 60000 && !colored && !ready) {
      //     console.log("inside colored");
      //     document.getElementById("timer").style.color = "red";
      //   }
      // }, 1000);
        return () => {
            
        }
    },[]);

    const handleSleep = () => {
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          handleCollectionGeneration();
          resolve(true);
        }, 2000);
      })
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

      const setTimer = () => {
        
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
              <div style={{height: '100%'}} className='flex-align-center flex-just-between flex-column' id="game-board">
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

                <div className='flex-align-center flex-just-around' style={{width: '100%'}}>
                  <div className='text-center board-sides'>
                      <h3>{`FluffyDemon9`}</h3>
                      {/* <img src={Wizard} width={125}></img>                                        */}
                      <h3>(Lvl. {players.p2.overall})</h3>
                  </div>
                  <div className='flex-align-center flex-column board-middle'>
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
                    {/* {!gameState ? <div className='ready-wrapper'>
                      <h2>READY</h2>  
                    </div> : null} */}
                    <div style={{width: 400, position: 'relative'}} id="p2-img-wrapper" className='flex-align-center flex-just-even'>
                        {/* <img className='p2-image' id="p2-image" src={players.p2.selected.img} width={400} height={400}></img>                         */}
                        <PlayingCard
                            size="small-none"
                            className="top-card-1-left"
                            hidden
                            card_info={{
                              src: Card1,
                            }}                                       
                        />
                        <PlayingCard 
                            size="small-none"
                            className="top-card-2-left"
                            hidden
                            card_info={{
                              src: Card2,
                            }}                                       
                        />
                        <PlayingCard 
                            size="small-none"
                            className="top-card-1-center"
                            hidden
                            card_info={{
                              src: Card3,
                            }}                                       
                        />
                        <PlayingCard 
                            size="small-none"
                            className="top-card-1-right"
                            hidden
                            card_info={{
                              src: Card4,
                            }}                                       
                        />
                        <PlayingCard 
                            size="small-none"
                            className="top-card-2-right"
                            hidden
                            card_info={{
                              src: Card5,
                            }}                                       
                        />
                    </div>                    
                  </div>
                  <div className='flex-align-center flex-just-around board-sides'>
                    <PlayingCard 
                      size="small"
                      className="deck"
                      hover="minimal"
                      hidden
                    />
                  </div>
                  {/* <div className='spacer'></div> */}
                </div>
                <div id="gameboard-middle" style={{width: '100%'}} className="flex-just-between gameboard-middle">
                  <div className='log-wrapper board-sides'>
                    <textarea className='game-log' id="game-log"></textarea>
                    <div className='fade-overlay'></div>
                  </div>
                  <div className='board-middle'>
                    {/* <ActionButton>ready up</ActionButton> */}
                  </div>
                  <div className='board-sides flex-column flex-align-center flex-just-center'>
                    <div className='dice'>
                      <h2>20</h2>
                    </div>
                    <ActionButton>Roll</ActionButton>
                  </div>
                  {!ready ? <div>
                    <p className='timer' id="timer"></p>
                  </div> : null}
                  <div className='flex-column flex-just-even flex-align-center'>
                    <h2>{winner === 1 ? `You Won!` : winner === 0 ? `Defeat!` : ""}</h2>
                    {winner ? <Button className='primary-white' variant="contained" onClick={handleGameEnd}>Home</Button> : null}
                  </div>
                  {/* {!ready ? 
                  <div className='spacer-top flex-just-even flex-align-center'>
                  <Button className='primary-white' variant="contained" onClick={handleGameState}>
                  <div className='flex-just-even flex-align-center' style={{width: 150}}>
                  <div style={{paddingTop: 4}}>Ready</div>
                  <ReadyIcon />    
                  </div>
                  </Button>
                  </div> : null} */}
                </div>

                <div className='flex-align-center flex-just-around' style={{width: '100%'}}>
                  <div className='text-center board-sides'>
                    <h3 style={{color: 'gold'}}>{player.user_name}</h3>
                    {/* <img src={Elf} width={125}></img> */}
                    <h3 style={{color: 'gold'}}>(Lvl. {player.selected.lvl})</h3>
                  </div>                  
                  <div className="flex-just-even board-middle">
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
                    <div style={{width: 400, position: 'relative'}} id="p1-img-wrapper" className='flex-align-center flex-just-even'>
                        {/* <img className='p1-image' id="p1-image" src={player.selected.img} width={400} height={400}></img>                         */}
                        <PlayingCard 
                            size="small"
                            className="bottom-card-1-left"
                            card_info={{
                                src: Card1,
                            }}                                       
                        />
                        <PlayingCard
                            size="small" 
                            className="bottom-card-2-left"
                            card_info={{
                                src: Card2,
                            }}                                       
                        />
                        <PlayingCard 
                            size="small"    
                            className="bottom-card-1-center"                      
                            card_info={{
                                src: Card3,
                            }}                                       
                        />
                        <PlayingCard 
                            size="small"
                            className="bottom-card-1-right"
                            card_info={{
                                src: Card4,
                            }}                                       
                        />
                        <PlayingCard 
                            size="small"
                            className="bottom-card-2-right"
                            card_info={{
                                src: Card5,
                            }}                                       
                        />
                    </div>                  
                  </div>
                  <div className='flex-align-center flex-just-around board-sides'>
                    <PlayingCard 
                      size="small"
                      className="deck"
                      hover="minimal"
                      hidden
                    />
                  </div>  
                  {/* <div>
                    <Items items={player.items} layout="col" />  
                  </div>                                   */}
                </div>
              </div>
              }
            </div>           
          </div>
    )
}

export default Game;