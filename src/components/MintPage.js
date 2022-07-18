import React, {useState} from 'react';
import Logo from '../assets/degen age logo BNW.jpg';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../stylesheet/MintPage.css';

const MAX_BATCH = 5;

const MintPage = () => {
    const [numMint,setNumMint] = useState(MAX_BATCH);
    const [wallet,setWallet] = useState(null);

    const handleAddMint = () => {
        const _num = document.getElementById('mint-number').value;

        if(_num < MAX_BATCH){
            setNumMint(prevState => prevState + 1);
        }
    }

    const handleMinusMint = () => {
        const _num = document.getElementById('mint-number').value;

        if(_num > 1){
            setNumMint(prevState => prevState - 1);
        }
    }

    const handleMint = () => {

    }

    const handleWalletConnect = () => {
        
    }

    return (
        <div className='mint-container'>
            <div className='mint-wrapper'>
                <h1>Early Adopters Pass Now Minting!</h1>
                <div>
                    <img src={Logo} width={200} height={200}></img>
                </div>
                <div style={{width: 250}} className='flex-just-even flex-align-center'>
                    <div>
                        <IconButton className='lightgray-bg' onClick={handleMinusMint}>
                            <MinusIcon className='white-btn' />
                        </IconButton>
                    </div>
                    <div>
                        <TextField disabled className='input-light' id="mint-number" value={numMint} type="number" />
                    </div>
                    <div>
                        <IconButton className='lightgray-bg' onClick={handleAddMint}>
                            <AddIcon className='white-btn' />
                        </IconButton>    
                    </div>
                </div>
                <div>
                    <Button className='white-btn' variant="contained" onClick={wallet ? handleMint : handleWalletConnect}>{wallet ? 'Mint' : 'Connect Wallet'}</Button>
                </div>
            </div>
        </div>
    )
}

export default MintPage;