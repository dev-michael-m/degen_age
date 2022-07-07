import './App.css';
import './stylesheet/Sections.css';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import LinearProgress from '@mui/material/LinearProgress';
import { battle, generateCollection, randNum } from './utilities/mechanics';

function App() {
    const [gameState,setGameState] = useState(false);
    const [players,setPlayers] = useState({});
    const [winner,setWinner] = useState(false);
    const [loading,setLoading] = useState(false);
    const [collection,setCollection] = useState([]);

    useEffect(() => {
      let mounted = true;

    if (mounted) {
      // (async() => {
      //   const sold_out = await getSoldOut();

      //   if(sold_out.data){
      //     setSoldOut(true);
      //   }else{
      //     const publicSale = await getPublicState();

      //     if(publicSale.status){
      //       if(publicSale.active){
      //           setSaleActive(true);
      //           setPubSale(publicSale.active);
      //       }          
      //     }
      //   }
      // })();

      // const connected = sessionStorage.getItem('connected');

      // if(connected === 'true'){
        
      //   ConnectWallet()
      //   .then((status) => {
      //     setWallet({
      //       address: status.address,
      //       snippet: status.address_snippet,
      //     });
      //     window.ethereum.on("accountsChanged", handleAccountsChanged);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      // }
      
    }        

    return () => {
      mounted = false;
    };
  }, []);
  
  const handleGameState = async () => {
    setGameState(true);
    if(Object.keys(players).length){
      const status = await battle(players.p1, players.p2);
      setWinner(status.winner);
    }    
  }

  const handleCollectionGeneration = () => {
    const _collection = generateCollection();
    setCollection(_collection);
    const _p1 = randNum(0,_collection.length);
    const _p2 = randNum(0,_collection.length);
    setPlayers({p1: _collection[_p1], p2: _collection[_p2]});
    console.log('Players are set')
  }

  const handleFairMatch = (_player, _collection) => {
    return new Promise((resolve) => {

    })
  }

  const handleReset = () => {
    setPlayers({});
    setWinner(false);
    const _p1 = randNum(0,collection.length);
    const _p2 = randNum(0,collection.length);
    document.getElementById('game-log').value = '';
    setPlayers({p1: collection[_p1], p2: collection[_p2]});
    handleGameState();
  }

  return (
    <div className="App">
          <div className="main-container parallax-container">
            <div className='inner-main'>
              {!gameState ? <div>
                <Button variant="contained" color="primary" onClick={handleGameState}>Battle</Button>
                <Button variant="contained" color="primary" onClick={handleCollectionGeneration}>Generate Collection</Button>
              </div> : loading ?
              <div className='flex-just-center flex-align-center'>
                <p>Connecting to War Room...</p>
                <CircularProgress />
              </div> :
              <div className='flex-align-center flex-just-between' id="game-board">
                <div className='flex-align-center flex-column' style={{width: '40%'}}>
                  <div>
                    <h3 style={{color: 'gold'}}>{players.p1.race} ({players.p1.overall})</h3>
                  </div>
                  <div className='float-small'>
                    <div className='hit-marker-container-right' id="hit-marker-container">
                      <div><h2 id="hit-marker-p1"></h2><div style={{display: 'none'}} id="p1-block"><RemoveModeratorIcon className="block-icon" id="block-icon-p1" /></div></div>
                    </div>                    
                    <img id="p1-image" src={players.p1.image} width={500} height={500}></img>
                  </div>
                  <div style={{width: '50%'}}>
                    <h3 id="player1-health-val">100</h3>
                    <LinearProgress id="player1-health" variant='determinate' value={100} />
                  </div>                                   
                </div>
                <div id="gameboard-middle" style={{width: '20%'}}>
                  <div>
                    <textarea className='game-log' id="game-log"></textarea>
                  </div>
                  <div>
                    <h2>{winner == 1 ? `You Won!` : `Defeat!`}</h2>
                    {winner ? <Button variant="contained" color="primary" onClick={handleReset}>Play Again</Button> : 
                    <Button variant="contained" color="primary">Battling...</Button>}
                  </div>
                </div>
                <div className='flex-align-center flex-column' style={{width: '40%'}}>
                  <div>
                      <h3>{players.p2.race} ({players.p2.overall})</h3>                                       
                  </div>
                  <div className='float-small-delayed'>
                    <div className='hit-marker-container-left' id="hit-marker-container">
                      <div><h2 id="hit-marker-p2"></h2><div style={{display: 'none'}} id="p2-block"><RemoveModeratorIcon className='block-icon' id="block-icon-p2" /></div></div>
                    </div>                    
                    <img id="p2-image" src={players.p2.image} width={500} height={500}></img>
                  </div>
                  <div style={{width: '50%'}}>
                    <h3 id="player2-health-val">100</h3>
                    <LinearProgress id="player2-health" variant='determinate' value={100} />
                  </div>                  
                </div>
              </div>
              }
            </div>
            <a id="twitter-link" href='https://twitter.com/WTF_PASS_NFT' hidden target="_blank"></a>
            <a id="discord-link" href='https://discord.gg/qUG8fXceDt' hidden target="_blank"></a>            
          </div>
    </div>
  );
}

export default App;
