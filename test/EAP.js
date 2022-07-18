const {expect} = require('chai');
const {ethers} = require('hardhat');
const {loadFixture} = require('@nomicfoundation/hardhat-network-helpers');

describe("Token contract", function () {
    async function deployTokenFixture() {
      const Token = await ethers.getContractFactory("EAP");
      const [owner, addr1, addr2] = await ethers.getSigners();
  
      const hardhatToken = await Token.deploy();
  
      await hardhatToken.deployed();
  
      // Fixtures can return anything you consider useful for your tests
      return { Token, hardhatToken, owner, addr1, addr2 };
    }
  
    it("Sale state should be 0", async function () {
        const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
  
        expect(await hardhatToken.sale_state()).to.equal(0);
    });

    it("Should not be able to mint tokens", async function () {
        const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
        await expect(hardhatToken.pubMint(1,{from: owner.address})).to.be.rejectedWith('Sale is currently inactive');
    });

    it("Sale state should be 1", async function () {
        const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
        await hardhatToken.setSaleState(1,{from: owner.address});
        expect(await hardhatToken.sale_state()).to.equal(1);
    });
  });