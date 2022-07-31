import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import ReadyIcon from '@mui/icons-material/ThumbUp';
import LinearProgress from '@mui/material/LinearProgress';
import HeartIcon from '@mui/icons-material/Favorite';
import '../App.css';
import '../stylesheet/Sections.css';
import '../stylesheet/Game.css';
import { battle, generateCollection, randNum } from '../utilities/mechanics';
import { useNavigate } from 'react-router-dom';

const Game = ({img,game_id}) => {
    const [gameState,setGameState] = useState(false);
    const [players,setPlayers] = useState({});
    const [winner,setWinner] = useState(false);
    const [loading,setLoading] = useState(true);
    const [collection,setCollection] = useState([]);
    const [ready,setReady] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        if(mounted){
            handleCollectionGeneration();
        }

        return () => {
            mounted = false;
        }
    },[]);

    const handleGameState = async () => {
        setGameState(true);
        setReady(true);
        if(Object.keys(players).length){
          const status = await battle(players.p1, players.p2);
          setWinner(status.winner);

          if(status.winner == 1){
            document.getElementById('p2-defeat').style.display = 'block';
          }else{
            document.getElementById('p1-defeat').style.display = 'block';
          }
        }    
      }
    
      const handleCollectionGeneration = () => {
        const _collection = generateCollection();
        setCollection(_collection);
        const _p1 = randNum(0,_collection.length);
        const _p2 = randNum(0,_collection.length);
        setPlayers({p1: _collection[_p1], p2: _collection[_p2]});
        setLoading(false);
        console.log('Players are set')
      }

      const handleGameEnd = () => {
        navigate('/play');
      }

    return (
        <div className="main-container parallax-container">
            <div className='inner-main'>
              {loading ?
              <div className='flex-just-center flex-align-center'>
                <p>Connecting to War Room...</p>
                <CircularProgress />
              </div> :
              <div className='flex-align-center flex-just-between' id="game-board">
                <div className='flex-align-center flex-column' style={{width: '40%'}}>
                  <div>
                    <h3 style={{color: 'gold'}}>{players.p1.race} (Lvl. {players.p1.overall})</h3>
                  </div>
                  <div className='float-small'>
                    <div className='hit-marker-container-right' id="hit-marker-container">
                      <div><h2 id="hit-marker-p1"></h2><div style={{display: 'none'}} id="p1-block"><RemoveModeratorIcon className="block-icon" id="block-icon-p1" /></div></div>
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
                    <h3 id="player1-health-val">100</h3>
                  </div>  
                  {!ready ? <Button className='primary-white' variant="contained" onClick={handleGameState}>
                      <div className='flex-just-even flex-align-center' style={{width: 150}}>
                          <div style={{paddingTop: 4}}>Ready</div>
                          <ReadyIcon />    
                      </div>
                  </Button> : null}                                  
                </div>
                <div id="gameboard-middle" style={{width: '20%'}}>
                  <div>
                    <textarea className='game-log' id="game-log"></textarea>
                  </div>
                  <div className='flex-column flex-just-even flex-align-center'>
                    <h2>{winner === 1 ? `You Won!` : winner === 0 ? `Defeat!` : ""}</h2>
                    {winner ? <Button className='primary-white' variant="contained" onClick={handleGameEnd}>Leave</Button> : null}
                  </div>
                </div>
                <div className='flex-align-center flex-column' style={{width: '40%'}}>
                  <div>
                      <h3>{players.p2.race} (Lvl. {players.p2.overall})</h3>                                       
                  </div>
                  <div className='float-small-delayed'>
                    <div className='hit-marker-container-left' id="hit-marker-container">
                      <div><h2 id="hit-marker-p2"></h2><div style={{display: 'none'}} id="p2-block"><RemoveModeratorIcon className='block-icon' id="block-icon-p2" /></div></div>
                    </div>
                    <div className='slash-wrapper'>
                      <div id="p2-slash"></div>
                    </div>
                    <div className='defeat-wrapper'>
                      <h2 id="p2-defeat">DEFEAT</h2>  
                    </div>
                    <div id="p2-img-wrapper">
                        <img className='p2-image' id="p2-image" src={players.p2.image} width={400} height={400}></img>                        
                    </div>                    
                  </div>
                  <div className='flex-align-center flex-just-around' style={{width: '75%'}}>
                    <h3 id="player2-health-val">100</h3>
                    <LinearProgress style={{width: '75%'}} id="player2-health" variant='determinate' value={100} />
                  </div>                  
                </div>
              </div>
              }
            </div>           
          </div>
    )
}

export default Game;