import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { selectPlayer, setPlayerImg, setUserName } from '../store/playerSlice';
import Knight from '../assets/knight 4.png';
import Wizard from '../assets/wizard compressed.jpg';
import Elf from '../assets/elf nft.jpg';
import Goblin from '../assets/goblin compressed.jpg';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/ClearOutlined';
import CheckMark from '@mui/icons-material/Check';
import '../stylesheet/Account.css';
import { FormatNumber, getUsername, setPlayerUsername } from './../utilities/util';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from './Button';
import CPIcon from '@mui/icons-material/Api';
import SchillIcon from '../assets/schil token logo.png';

const NAME_MIN = 5;
const NAME_MAX = 25;

const Account = () => {
    const player = useSelector(selectPlayer);
    const dispatch = useDispatch();
    const [anchorEl,setAnchorEl] = useState(null);
    const [username,setUsername] = useState(player.user_name);
    const [selected,setSelected] = useState(0)
    const [snack,setSnack] = useState({
        open: false,
        severity: 'success',
        msg: ''
    })

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleOpenMenu = (_event) => {
        setAnchorEl(_event.currentTarget)
    }

    const handleEditUsername = async () => {
        const _username = document.getElementById('username').value;

        const valid = await validateUsername(_username);

        if(valid.status){
            const status = await setPlayerUsername(_username,player.address);

            if(status.data){
                dispatch(setUserName(_username));
                setUsername(_username);
                setAnchorEl(null);
            }else{
                setSnack(prevState => ({
                    ...prevState,
                    open: true,
                    severity: 'error',
                    msg: status.msg
                }))
            }
        }else{
            setSnack(prevState => ({
                ...prevState,
                open: true,
                severity: 'warning',
                msg: valid.msg
            }))
        }

    }

    const validateUsername = (_username) => {
        return new Promise(async(resolve,reject) => {
            const exists = await getUsername(_username);
            
            if(!_username){
                resolve({
                    status: false,
                    msg: `Username cannot be blank!`
                })
            }else if(_username.length < NAME_MIN || _username.length > NAME_MAX){
                resolve({
                    status: false,
                    msg: `Username must be at least 5 characters long, and no more than 15.`
                })
            }else if(exists && !exists.data.empty){
                resolve({
                    status: false,
                    msg: `Username has already been taken. Please try a different one.`
                })
            }else{
                resolve({status: true});
            }
        })
    }

    const handleClose = () => {
        setSnack(prevState => ({
            ...prevState,
            open: false
        }))
    }

    const handleImgSelect = (_event) => {
      const id = _event.target.id;
      setSelected(id);
    }

    return (
      <div className="account-container">
        <div className="account-wrapper">
          <Snackbar open={snack.open} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={snack.severity}
            >
              {snack.msg}
            </Alert>
          </Snackbar>
          <div className='account-inner'>
            <div className='flex-align-end'>
              <div>
                <div className="flex-align-center">
                  <h2>{username}</h2>
                  <Menu
                    id="edit-user"
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleCloseMenu}
                  >
                    <div
                      className="flex-column flex-just-center flex-align-center"
                      style={{ width: 400 }}
                    >
                      <h3>Edit Username</h3>
                      <TextField id="username" variant="outlined" type="text" />
                      <div
                        style={{ width: 200 }}
                        className="flex-align-center flex-just-even"
                      >
                        <IconButton onClick={handleCloseMenu}>
                          <ClearIcon style={{ color: "red" }} />
                        </IconButton>
                        <IconButton onClick={handleEditUsername}>
                          <CheckMark style={{ color: "green" }} />
                        </IconButton>
                      </div>
                    </div>
                  </Menu>
                  <IconButton onClick={handleOpenMenu}>
                    <EditIcon style={{ color: "white" }} />
                  </IconButton>
                </div>
                <div>
                  <img className='img-border' src={selected == 0 ? Elf : selected == 1 ? Wizard : selected == 2 ? Knight : Goblin} width={200}></img>
                </div>
              </div>
              <div className='account-title-left'>
                <div className='account-title-wrapper'>
                  <div>
                    <p>Faction: Elves </p>
                    <p>Strength: 999</p>
                    <p>Magic: 999</p>
                    <p>Range: 999</p>
                    <p>Defense: 999</p>
                  </div>
                  <div className='account-title-right'>
                      <div>
                        <div style={{marginRight: 28, width: 80, marginBottom: 16}} id="campaign-points" className='flex-just-even flex-align-center'>
                            <CPIcon style={{color: 'floralwhite', fontSize: 30, marginRight: 8}} />
                            <label className={`top-bar-label-cp ${player.cp >= 1e6 && player.cp < 1e9 ? 'label-green' : player.cp >= 1e9 && player.cp < 1e12 ? 'label-orange' : ''}`}>{FormatNumber(player.cp)}</label>
                        </div>
                        <div style={{width: 136, marginBottom: 16}} id="schills" className='flex-just-even flex-align-center'>
                            <img style={{marginRight: 8}} src={SchillIcon} width={32}></img>
                            <label className={`top-bar-label-sch ${player.tokens >= 1e6 && player.tokens < 1e9 ? 'label-green' : player.tokens >= 1e9 && player.tokens < 1e12 ? 'label-orange' : ''}`}>{FormatNumber(player.tokens)}</label>
                        </div>                    
                      </div>
                      <Button>save changes</Button>
                      {/* <Button style={{width: 200}} className='primary-white' variant="contained" >save changes</Button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className='spacing-medium'>
                <h2>Select Your Warrior</h2>
                <div className='flex-align-center flex-just-between'>
                    <div id={0} className={`char-select ${selected == 0 ? 'char-selected' : ''}`} onClick={handleImgSelect}>
                        <img id={0} src={Elf}></img>
                    </div>
                    <div id={1} className={`char-select ${selected == 1 ? 'char-selected' : ''}`} onClick={handleImgSelect}>
                        <img id={1} src={Wizard}></img>
                    </div>
                    <div id={2} className={`char-select ${selected == 2 ? 'char-selected' : ''}`} onClick={handleImgSelect}>
                        <img id={2} src={Knight}></img>
                    </div>
                    <div id={3} className={`char-select ${selected == 3 ? 'char-selected' : ''}`} onClick={handleImgSelect}>
                        <img id={3} src={Goblin}></img>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Account;