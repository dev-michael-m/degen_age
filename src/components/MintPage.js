import React, {useState,useEffect} from 'react';
import Logo from '../assets/degen age title GNW skull.png';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import CheckIcon from '@mui/icons-material/CheckOutlined';
import '../stylesheet/MintPage.css';
import { connectWalletSync, Mint } from '../utilities/util';

const MAX_BATCH = 5;

const MintPage = () => {
    const [numMint,setNumMint] = useState(MAX_BATCH);
    const [wallet,setWallet] = useState(null);
    const [openAlert,setOpenAlert] = useState({
        open: false,
        severity: 'success',
        msg: null
    });
    const [dialog,setDialog] = useState(false);
    const [txn,setTxn] = useState(null);

    useEffect(() => {
        let mounted = true;

        if(mounted){
            connectWalletSync().then(res => {
                setWallet(res.address);
            }).catch(error => {
                console.error(error);
            })
        }

        return () => {
            mounted = false;
        }
    },[]);

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
        Mint(numMint,wallet).then(res => {
            setTxn(res.data);
            setDialog(true);
        }).catch(error => {
            console.error(error.msg);
            setOpenAlert({
                open: true,
                msg: error.msg,
                severity: error.status
            })
        })
    }

    const handleWalletConnect = () => {
        connectWalletSync().then(res => {
            if(res.status){
                setWallet(res.address);
                setOpenAlert({
                    open: true,
                    msg: `Wallet connected!`,
                    severity: 'success'
                })
            }
        }).catch(error => {
            console.error(error);
        })
    }

    const toggleSnackbar = () => {
        setOpenAlert(prevState => ({
            ...prevState,
            open: !prevState.open
        }));
    }

    const toggleDialog = () => {
        setDialog(prevState => !prevState);
    }

    return (
        <div className='mint-container'>
            <Snackbar open={openAlert.open} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={toggleSnackbar}>
                <MuiAlert onClose={toggleSnackbar} severity={openAlert.severity}>
                    {openAlert.msg}
                </MuiAlert>
            </Snackbar>
            <Dialog open={dialog} maxWidth="lg" onClose={toggleDialog}>
                <DialogTitle className='text-center'>Mint Successful!</DialogTitle>
                <DialogContent className='text-center' style={{maxWidth: 730}}>
                    <CheckIcon style={{color: 'green'}} />
                    <DialogContentText>
                        You can view your transaction here: {`https://etherscan.io/tx/${txn}`}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <div className='mint-wrapper'>
                <h1>Early Adopters Pass Now Minting!</h1>
                <div>
                    <img src={Logo} width={300} height={300}></img>
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