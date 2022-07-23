# Follow these steps when deploying to mainnet
## 1. Run - npx hardhat clean
## 2. Run - npx hardhat compile
## 3. Run - npx hardhat run --network mainnet scripts/deploy.js
## 4. Copy contract address and add to .env
## 5. Run - npx hardhat verify --network mainnet <CONTRACT_ADDRESS>
## 6. Copy and paste ABI into contract-abi.json
## 7. Mint reserved tokens from contract owner
## 8. Change primary address to address other than contract owner
## 9. Set public key to contract owner address
## 10. Set sale state from 0 - 1