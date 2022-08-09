# Follow these steps when deploying to mainnet
## 1. Run - npx hardhat clean
## 2. Run - npx hardhat compile
## 3. Change Alchemy API key to be on mainnet
## 4. Run - npx hardhat run --network mainnet scripts/deploy.js
## 5. Copy contract address and add to .env
## 6. Run - npx hardhat verify --network mainnet <CONTRACT_ADDRESS>
## 7. Copy and paste ABI from etherscan into contract-abi.json
## 8. Remove private key env var from .env
## 9. Mint reserved tokens from contract owner
## 10. Setup OpenSea collection
## 11. Add whitelisted addresses to contract
## 12. Set sale state from 0 -> 1 (presale)
## 13. Set sale state from 1 -> 2 (public)
## 14. Call withdraw function from contract