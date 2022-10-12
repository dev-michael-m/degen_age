const {ethers} = require('ethers');
const {whitelist} = require('../whitelist.json');

require('dotenv').config();
const _alkk = process.env.REACT_APP_ALKK;
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const LSOM_CONTRACT = process.env.REACT_APP_LSOM_ADDRESS;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(_alkk);
const contractABI = require('../contract-abi.json');
const lsomABI = require('../lsom-abi.json');

const DECIMALS = 3;

export const _contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS)
export const _lsomContract = new web3.eth.Contract(lsomABI, LSOM_CONTRACT);

export const FormatNumber = (_num) => {
    return _num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

export const connectWalletSync = () => {
    return new Promise(async(resolve,reject) => {
        if(window.ethereum.request({method: 'eth_requestAccounts'})){
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
    
                resolve({status: true, address: address});
            } catch (error) {
                console.error(error);
                reject({status: false, msg: error});
            }
        }else{
            console.warn('users wallet is not connected');
            reject({status: false, msg: 'users wallet is not connected'});
        }
    })    
}

export const Mint = async (_num, _address) => {
    return new Promise(async(resolve,reject) => {
        try {
            if(_address){
                const price = await _contract.methods.SALE_PRICE().call();
                const mint_price = parseFloat(web3.utils.fromWei(price,'ether'));
                const _saleState = await _contract.methods.sale_state().call();
                
                if(_saleState == 1){
                    const exists = whitelist.find(doc => doc.toUpperCase() == _address.toUpperCase());   // check address is on wl
                    
                    if(exists){
                        const tx = {
                            from: _address,
                            to: process.env.REACT_APP_CONTRACT_ADDRESS,
                            value: web3.utils.toHex(web3.utils.toWei(String((mint_price * _num).toFixed(DECIMALS)),'ether')),
                            data: _contract.methods.presale(_num).encodeABI(),
                        }

                        const txHash = await window.ethereum.request({
                            method: 'eth_sendTransaction',
                            params: [tx]
                        })

                        resolve({data: txHash});
                    }else{
                      reject({msg: `You are not currently on the whitelist.`, status: 'warning'})  
                    }
                }else if(_saleState == 2){
                    const tx = {
                        from: _address,
                        to: process.env.REACT_APP_CONTRACT_ADDRESS,
                        value: web3.utils.toHex(web3.utils.toWei(String((mint_price * _num).toFixed(DECIMALS)),'ether')),
                        data: _contract.methods.pubMint(_num).encodeABI(),
                    }

                    const txHash = await window.ethereum.request({
                        method: 'eth_sendTransaction',
                        params: [tx]
                    })

                    resolve({data: txHash});
                }else{
                    reject({msg: `Sale is currently inactive.`, status: 'warning'})
                }                
            }else{
                reject({
                    status: 'warning',
                    msg: `You must connect your MetaMask wallet to continue.  If you don't have a Metamask wallet, follow this link to get started LINK`
                })
            }    
        } catch (error) {
            console.error(`util.mintNFT: ${error}`)
            reject({
                status: 'error',
                msg: error.message
            })
        }
    })
    
  }

export const MintShards = async (_num, _address) => {
    return new Promise(async(resolve,reject) => {
        try {
            if(_address){
                const _saleState = await _lsomContract.methods.sale_state().call();
                
                if(_saleState == 1){
                    const tx = {
                        from: _address,
                        to: process.env.REACT_APP_LSOM_ADDRESS,
                        value: '0x0',
                        data: _lsomContract.methods.eapMint(_num).encodeABI(),
                    }

                    const txHash = await window.ethereum.request({
                        method: 'eth_sendTransaction',
                        params: [tx]
                    })

                    resolve({data: txHash});
                    
                }else if(_saleState == 2){
                    const tx = {
                        from: _address,
                        to: process.env.REACT_APP_LSOM_ADDRESS,
                        value: '0x0',
                        data: _lsomContract.methods.pubMint(_num).encodeABI(),
                    }

                    const txHash = await window.ethereum.request({
                        method: 'eth_sendTransaction',
                        params: [tx]
                    })

                    resolve({data: txHash});
                }else{
                    reject({msg: `Sale is currently inactive.`, status: 'warning'})
                }                
            }else{
                reject({
                    status: 'warning',
                    msg: `You must connect your MetaMask wallet to continue.  If you don't have a Metamask wallet, follow this link to get started LINK`
                })
            }    
        } catch (error) {
            console.error(`util.mintNFT: ${error}`)
            reject({
                status: 'error',
                msg: error.message
            })
        }
    })
    
  }