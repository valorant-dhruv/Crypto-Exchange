const { assert } = require("console");
const { expect } = require("chai");

//For testing purposes we first need the deployed smart contract
let Tokens = artifacts.require("Dhruv");
const { expectRevert, expectEvent } = require("@openzeppelin/test-helpers");

//Now for testing we write the contract function
contract("Tokens", (accounts) => {
  //Here we are going to test mulitple things and each test block will require the accounts and the instance of the smart contract
  let owner;
  let acc1;
  let acc2;
  let tokens;

  //This is the before hook that will run before all the test blocks are executed
  before(async () => {
    tokens = await Tokens.deployed();
    owner = accounts[0];
    acc1 = accounts[1];
    acc2 = accounts[2];
  });

  //Should check the totalSupply function
  it("The totalSupply function should work correctly", async () => {
    let total = await tokens.totalSupply();
    let realtotal = await total.toString();
    assert(total == "1000000", "The totalSupply is incorrect");
  });

  //This is the first it block which checks whether intially all the tokens are available with the creator or not
  it("Should verify that the creator of the contract has all the tokens", async () => {
    let balance = await tokens.balanceOf(owner);
    let balancereal = await balance.toString();
    assert(
      balance == "1000000",
      "The owner of the smart contract doesn't correct tokens"
    );
  });

  //This should check whether the transfer function is working correctly or not
  it("Should transfer tokens to another account", async () => {
    let tokenstotransfer = 100;
    let tokeninBn = await web3.utils.toBN(tokenstotransfer);
    let result = await tokens.transfer(acc1, tokeninBn, {
      from: owner,
    });
    let balance = await tokens.balanceOf(acc1);
    let balancereal = await balance.toString();
    assert(balancereal == "100", "The transfer is not quite successful");
    expectEvent(result, "Transfer", {
      from: owner,
      to: acc1,
      tokens: tokeninBn,
    });
  });

  it("should NOT transfer token in balance is too low", async () => {
    //This basically means that if the transfer is reverted than the test block will pass
    await expectRevert(
      tokens.transfer(acc2, web3.utils.toBN(10000), {
        from: acc1,
      }),
      "The sender cannot send more than what he/she owns"
    );
  });

  //This test block should approve the other account to spend the tokens
  it("Should approve the other account ", async () => {
    let tokenstoapprove = 1000;
    let tokensreal = await web3.utils.toBN(tokenstoapprove);
    let result = await tokens.approve(acc1, tokensreal);
    let allowed = await tokens.allowance(owner, acc1);
    assert(allowed.toString() == "1000");
    expectEvent(result, "Approval", {
      tokenOwner: owner,
      spender: acc1,
      tokens: tokensreal,
    });
  });

  //This test should fail because the acc1 cannot allow tokens because of not having sufficient funds
  it("Should fail because account1 doesnt have sufficient funds to allow other", async () => {
    let balance = await web3.utils.toBN(1000);
    await expectRevert(
      tokens.approve(acc2, balance, {
        from: acc1,
      }),
      "It should be greater"
    );
  });

  //Finally the last test block is that the allowed account should be able to transfer the funds from original account to another
  it("Should transfer the approved amount", async () => {
    let initalBalance = await tokens.allowance(owner, acc1);
    let amounttotransfer = await web3.utils.toBN(50);
    let result = await tokens.transferFrom(owner, acc2, amounttotransfer, {
      from: acc1,
    });
    let approvednew = await tokens.allowance(owner, acc1);
    let compare = web3.utils.toBN(initalBalance);
    compare = initalBalance.sub(amounttotransfer);
    expect(compare.toString()).to.equal(approvednew.toString());
    expectEvent(result, "Transfer", {
      from: owner,
      to: acc2,
      tokens: amounttotransfer,
    });
  });
});
