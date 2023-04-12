const { assert } = require("console");
const { expect } = require("chai");

//For testing purposes we first need the deployed smart contract
let EthSwap = artifacts.require("EthSwap");
let Tokens = artifacts.require("Dhruv");
const { expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");

contract("EthSwap", (accounts) => {
  let tokens = null;
  let ethswap = null;
  let owner;
  let acc1;
  before(async () => {
    ethswap = await EthSwap.deployed();
    tokens = await Tokens.deployed();
    owner = accounts[0];
    acc1 = accounts[3];
  });

  //This test block returns the amount of tokens that the owner of the contract has
  it("Should return the balance of owner of the smart contract", async () => {
    let owner = await ethswap.owneroftokens();
    let balance = await ethswap.getbalance(owner);
    console.log(balance.toString());
    expect(balance.toString()).to.equal("1000000");
  });

  describe("Buying of the tokens", () => {
    let ethers = 2;
    //This test block transfers the tokens to the another account in exchange for ethers
    it("Should transfer the tokens from the owner's account to receipent's account and deduct the ethers", async () => {
      let sending = await web3.utils.toWei(ethers.toString(), "ether");
      //Before buying the tokens let us check the ether balance of acc1
      let etherbalance = await web3.eth.getBalance(acc1);
      console.log(
        "This is the old balance of the acc1",
        web3.utils.fromWei(etherbalance.toString(), "ether")
      );

      let received = await ethswap
        .buytokens({
          from: acc1,
          value: sending,
        })
        .then();
      let amount = await ethswap.tokenstotransfer(acc1);
      await tokens.transfer(acc1, amount, {
        from: owner,
      });

      //By this we get the token balance of acc1
      let balance = await ethswap.getbalance(acc1);
      let etherbalancenew = await web3.eth.getBalance(acc1);
      console.log(
        "This is the amount of tokens in account1",
        balance.toString()
      );
      console.log(
        "This is the new ether balance of the acc1",
        web3.utils.fromWei(etherbalancenew.toString(), "ether")
      );

      //This is to check whether the token balance is equal to the ethers*100 that we passed
      expect(balance.toString()).to.equal((ethers * 100).toString());

      //Now once the token balance is same we now check whether the ethers are deducted from the acc1 or no
    });

    it("The smart contract should receive the ethers and tokens should be deducted from the owner's account", async () => {
      let owner = await ethswap.owneroftokens();
      let balance = await ethswap.getbalance(owner);
      let contractethers = await ethswap.getBalances();
      console.log(
        "The amount of ethers in the EthSwap contract are",
        web3.utils.fromWei(contractethers.toString(), "ether")
      );
      console.log("The tokens is the owner's account now", balance.toString());
      //This checks whether the tokens are deducted from the owner's account or not
      expect(balance.toString()).to.equal((1000000 - ethers * 100).toString());
    });

    describe("Selling of tokens", () => {
      let tokenstotransfer = 50;
      it("Should transfer the tokens from the account address to the owner of the contract", async () => {
        //We are first checking the amount of tokens in the owner account
        let tokensinowner = await ethswap.getbalance(owner);
        await console.log(
          "The tokens in the owner before receiving it",
          tokensinowner.toString()
        );

        //We are also checking the amount of tokens in the sender account
        let tokensinsender = await ethswap.getbalance(acc1);
        await console.log(
          "The tokens in the sender before sending it",
          tokensinsender.toString()
        );

        let result = await tokens.transfer(owner, tokenstotransfer, {
          from: acc1,
        });

        let tokensinowner2 = await ethswap.getbalance(owner);
        await console.log(
          "The tokens in the owner after receiving it",
          tokensinowner2.toString()
        );

        //We are also checking the amount of tokens in the sender account
        let tokensinsender2 = await ethswap.getbalance(acc1);
        await console.log(
          "The tokens in the sender after sending it",
          tokensinsender2.toString()
        );

        expect((tokensinowner2 - tokensinowner).toString()).to.equal(
          (tokensinsender - tokensinsender2).toString()
        );

        //Now we are seeing the ether balance of the ethswap smart contract
        let etherintial = await ethswap.getBalances();
        await console.log(
          "Initial ether balance of the contract",
          etherintial.toString()
        );

        //This is the inital ether balance of the acc1 address
        let etherintial1 = await web3.eth.getBalance(acc1);
        await console.log(
          "Initial ether balance of the acc1",
          etherintial1.toString()
        );

        //Now we are transfering the ethers from the smart contract to the acc1
        await ethswap.selltokens(tokenstotransfer, acc1);

        //Now we are checking the balances of the ethers after transferring the ethers from one account to another
        etherintial01 = await ethswap.getBalances();
        await console.log(
          "Final ether balance of the contract",
          etherintial01.toString()
        );

        etherintial11 = await web3.eth.getBalance(acc1);
        await console.log(
          "Final ether balance of the acc1",
          etherintial11.toString()
        );
      });
    });
  });
});
