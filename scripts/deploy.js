async function main() {
    const EAP = await ethers.getContractFactory("EAP")
    // Start deployment, returning a promise that resolves to a contract object
    const eap = await EAP.deploy();
    console.log("Contract deployed to address:", eap.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })