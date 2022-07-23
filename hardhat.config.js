/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const ETHK = "EMHUGWS93AQHJME3JBBABZ3HI4FSHF6TR3";

module.exports = {
   solidity: {
      version: "0.8.1",
      settings: {
         optimizer: {
            enabled: true,
            runs: 200
         }
      }
   },
   defaultNetwork: "rinkeby",
   networks: {
      hardhat: {},
      rinkeby: {
         url: process.env.ALKU,
         accounts: [`0x${process.env.REACT_APP_KRP}`]
      }
   },
   etherscan: {
      apiKey: ETHK
   }
}
