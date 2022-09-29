import {ethers} from 'ethers';
import {LVLS} from '../constants';
import {collection, query, where, getDocs, doc, updateDoc} from 'firebase/firestore';
import { db } from '../firebase/firestore';

export const FormatNumber = (_num) => {
    const _parsed = parseInt(_num);
    return _parsed <= 0 ? 0 : 
    _parsed < 1e12 && _parsed >= 1e9 ? truncate(_parsed / 1e9) + "B" :
    _parsed < 1e9 && _parsed >= 1e6 ? truncate(_parsed / 1e6) + "M" :
    _parsed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const truncate = (_num) => {
    let step = Math.pow(10,2 || 0);
    let temp = Math.trunc(step * _num);
    return temp / step;
}

export const getPlayerData = (_address) => {
    return new Promise(async(resolve,reject) => {
        try {
            const _query = await getDocs(query(collection(db, 'players'), where("address","==",_address)));
            resolve({data: _query});
        } catch (error) {
            console.error(`util.getPlayerData: ${error}`);
            reject({data: false, msg: error});
        }
    })
}

export const getUsername = (_username) => {
    return new Promise(async(resolve,reject) => {
        try {
            const _query = await getDocs(query(collection(db, 'players'), where("user_name","==",_username)));
            resolve({data: _query});
        } catch (error) {
            console.error(`util.getUsername: ${error}`);
            reject({data: false, msg: error});
        }
    })
}

export const setPlayerUsername = (_username,_address) => {
    return new Promise(async(resolve,reject) => {
        try {
            const dbRef = await getDocs(query(collection(db, 'players'), where("address","==",_address)));
            
            if(!dbRef.empty){
                const _id = dbRef.docs[0].id;
                const playerRef = doc(db,'players',_id);
                await updateDoc(playerRef, {
                    user_name: _username
                });
                resolve({data: true});
            }
        } catch (error) {
            console.error(`util.setPlayerUsername: ${error}`);
            reject({data: false, msg: error});
        }
    })
}

export const ConnectWallet = async () => {
    return new Promise(async(resolve,reject) => {
        window.ethereum.request({method: 'eth_requestAccounts'})
        .then(async(res) => {
            try {                
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                
                resolve({
                    status: 'success',
                    msg: 'Wallet connected',
                    address: address,
                    address_snippet: MaskAddress(address)
                })
            } catch (error) {
                console.error(error);
                reject({
                    status: 'error',
                    msg: 'Something went wrong. Try waiting a minute and try again.'
                })                
            }
        }).catch(err => {
            console.error(err);
            reject({
                status: 'warning',
                msg: 'Wallet is not connected.  Please make sure to connect your wallet and try again.'
            })
        })
    })    
}

export const MaskAddress = (full_address = '') => {
    try {
        const first_half = full_address.substring(0,5);
        const second_half = full_address.substring(full_address.length - 4);
        return `${first_half}...${second_half}`;
    } catch (error) {
        console.error(error);
    }
}

export const getColorLvl = (_lvl) => {
    let _color = LVLS[0].color

    for(let i = 0; i < LVLS.length; i++){
        if(_lvl >= LVLS[i].min && _lvl <= LVLS[i].max){
            _color = LVLS[i].color;
            break;
        }
    }

    return _color;
}