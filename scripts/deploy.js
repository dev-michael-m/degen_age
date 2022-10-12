async function main() {
    const LSOM = await ethers.getContractFactory("LSOM")
    // Start deployment, returning a promise that resolves to a contract object
    const lsom = await LSOM.deploy();
    console.log("Contract deployed to address:", lsom.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })