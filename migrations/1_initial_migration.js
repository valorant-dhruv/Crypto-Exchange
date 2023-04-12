let EthSwap = artifacts.require("EthSwap");
let Dhruv = artifacts.require("Dhruv");

module.exports = async function (deployer, _network, accounts) {
  await deployer.deploy(Dhruv);
  let contract2 = await Dhruv.deployed();
  await deployer.deploy(EthSwap, contract2.address);

  //Now as both the contracts are migrated or we can say deployed to the smart contract
  //We can create instances of the smart contract and transfer the tokens from Dhruv to EthSwap
  // let contract1 = await EthSwap.deployed();

  // //This is the balance of the owner of the Dhruv smart contract
  // const balance = await contract2.balanceOf(
  //   "0x5d78d8b29801f5627954999d28f8abe66f43e989"
  // );

  //This is the ethswap contract address 0x15eA7829B8aF76b5cD2Acb59E6F29874ec0cC0f9
  //This is the Dhruv contract address 0xb04b3fAdEF0bf5EE89EC7A4E0DD84794311B2137

  // //Now we are going to transfer ethers to the contract1 address
  // //For transferring the tokens we are going to use the transfer function of the dhruv smart contract
  // await contract2.transfer(contract1.address, balance);
  // const ethswapbalance = await contract2.balanceOf(contract1.address);

  // console.log(ethswapbalance.toString());
};
