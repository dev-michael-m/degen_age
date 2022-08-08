import React, {useState} from 'react';
import {whitelist} from '../whitelist.json';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CheckMark from '@mui/icons-material/CheckCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import '../stylesheet/Premint.css';
import { useNavigate } from 'react-router-dom';

const Premint = () => {
    const [verified,setVerified] = useState(false);
    const [open,setOpen] = useState(false);
    const navigate = useNavigate();

    const onVerify = () => {
        const _address = document.getElementById('address').value;

        if(_address){
            const _exists = whitelist.find(wl => wl.toUpperCase() == _address.toUpperCase());

            if(_exists){
                setVerified(true);
                setOpen(true);
                document.getElementById('address').value = "";
            }else{
                alert(`WARNING: This address does not appear to be on the whitelist.\n\nPlease make sure your ETH address is entered correctly and try again.\n\nIf you think this is a mistake, please DM us at https://twitter.com/degenagenft`)
            }
        }else {
            alert(`WARNING: Address field cannot be blank.`)
        }
    }

    const onToggleModal = () => {
        setOpen(prevState => !prevState);
    }

    const handleHomeClick = () => {
        navigate('/');
    }

    return (
      <div className="premint-container">
        <Modal
          open={open}
          onClose={onToggleModal}
        >
            <div className='modal-medium'>
                <div className='spacing-small'>
                    <CheckMark style={{color: 'springgreen',fontSize: 100}} />
                </div>
                <h2>Address Verified!</h2>
                <h2>We will see you on mint day!</h2>
            </div>
        </Modal>
        {!verified ? <div className="premint-wrapper">
          <h2>
            Enter your ETH address in the text field below, and click VERIFY.
          </h2>
          <div style={{width: '75%'}} className="spacing-small">
            <TextField
              className="premint-input"
              id="address"
              variant="outlined"
              type="text"
            />
          </div>
          <div className="spacing-vsmall">
            <Button
              className="primary-white"
              variant="contained"
              onClick={onVerify}
            >
              Verify
            </Button>
          </div>
        </div> : 
        <div className='premint-wrapper'>
            <div className='spacing-small'>
                <CheckMark style={{color: 'springgreen',fontSize: 100}} />
            </div>
            <h1>Verified!</h1>
            <div className="spacing-vsmall">
                <Button
                className="primary-white"
                variant="contained"
                onClick={handleHomeClick}
                
                >
                    <div className='flex-align-center flex-just-even' style={{width: 130}}>
                        <HomeIcon style={{fontSize: 24}} />
                        <div>Home</div>
                    </div>
                </Button>
          </div>
        </div>
        }
      </div>
    );
}

export default Premint;