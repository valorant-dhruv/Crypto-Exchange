import React, { useState, useEffect } from "react";

//Here we are importing the compiled smart contracts

import Dhruv from "./contracts/Dhruv.json";
import EthSwap from "./contracts/EthSwap.json";
import Web3 from "web3";
import { ethers } from "ethers";
import "./App.css";

//Importing the web3 library as this library is important for connecting the application with the blockchain
import getWeb3 from "./getWeb3";

function App() {
  //Now we are going to have a state varible which stores the following information
  let [state, setstate] = useState({
    web3: null,
    contract1: null,
    contract2: null,
  });
  let [storagevalue, setstoragevalue] = useState(null);
  const [web3, setweb3] = useState("");
  let [ethersbuy, setethersbuy] = useState(0);
  let [tokensbuy, settokensbuy] = useState(0);
  let [exists, setexists] = useState(false);
  const [walletaddress, setwalletaddress] = useState("");
  const [walletbalance, setwalletbalance] = useState("");
  const [wallettoken, setwallettoken] = useState("");
  const [tokenssell, settokenssell] = useState(0);
  const [etherssell, setetherssell] = useState(0);

  useEffect(async () => {
    //First we are creating the web3
    //Here we are creating an instance of the web3 library
    // let web3 = await getWeb3();
    let web3 = new Web3(
      "https://goerli.infura.io/v3/40013e8122f34b3ea56d347c05228698"
    );
    // console.log(web3);
    // console.log(typeof web3.eth);
    // setweb3(web3);

    //Now this is the network id
    //The network id will help us in getting the contract address
    //Like for ganache the network id is 5777
    let networkId = await web3.eth.net.getId();

    console.log("This is the network id", networkId);
    // The networkId variable now contains the value 5777
    const deployedNetwork1 = await Dhruv.networks[5];
    const deployedNetwork2 = await EthSwap.networks[5];

    console.log(deployedNetwork1);

    //Hence we have now got the contract addresses of both the accounts
    await console.log("Dhruv contract address", deployedNetwork1.address);
    await console.log("EthSwap contract address", deployedNetwork2.address);

    //Now we are creating the instances of the smart contract
    //As we have already seen for creating instances of the smart contract we basically need two things the ABI and the contract address
    const instance1 = await new web3.eth.Contract(
      Dhruv.abi,
      deployedNetwork1 && deployedNetwork1.address
    );

    const instance2 = await new web3.eth.Contract(
      EthSwap.abi,
      deployedNetwork2 && deployedNetwork2.address
    );

    //Thus we have now obtained the instances of both the contracts and we can work with these instances to access the functions

    setstate({ web3, contract1: instance1, contract2: instance2 });
    console.log("This useEffect is now complete");
  }, []);

  async function btnclicked() {
    let { web3, contract1, contract2 } = state;

    // let privatekey =
    //   "0c7fcfbf8330ec840cae0000ba1553f5bcd6070e51747c72c24412b5979fda8f";
    let sending = await state.web3.utils.toWei(ethersbuy.toString(), "ether");
    console.log("The amount of ethers to transfer in wei", sending);
    // console.log(typeof sending);

    // const tx = await contract2.methods.buytokens(sending);

    // //Now we are estimating the gas that will be required to send this transaction
    // const gas = await tx.estimateGas({ from: walletaddress });

    // const gasprice = await web3.eth.getGasPrice();
    // const data = tx.encodeABI();

    // console.log(
    //   data,
    //   "This is the encoded data of the function that we are trying to call"
    // );

    // console.log("This is the gas price", gasprice);
    //Now the next step is that we are going to sign the transaction

    //The signing of the transaction is done with the help of the metamask
    // let signedtx = await window.ethereum.request({
    //   method: "_sign",
    //   params: [walletaddress, tx],
    // });

    // let signedtx = await window.ethereum.request({
    //   method: "personal_sign",
    //   params: [walletaddress, "Hello world"],
    // });

    // console.log("This is the signed transaction 1", signedtx);

    //How to get the

    // let transactionobject = {
    //   from: walletaddress,
    //   to: contract2.options.address,
    //   data,
    //   gas,
    //   gasprice,
    //   chainId: 5,
    // };

    // console.log("This is the transaction object", transactionobject);

    // let params = [
    //   {
    //     from: walletaddress,
    //     to: contract2.options.address,
    //     gas: Number(gas).toString(),
    //     gasprice: Number(gasprice).toString(),
    //     data: data,
    //     value: Number(100000000000000000).toString(16),
    //   },
    // ];

    // console.log("This is the params");

    // // let signedtx2 = await web3.eth.signTransaction(
    // //   transactionobject,
    // //   privatekey
    // // );

    // let signedtx2 = await window.ethereum.request({
    //   method: "eth_sendTransaction",
    //   params,
    // });

    // console.log("This is the signed transaction", signedtx2);

    // let data = await web3.eth.abi.encodeFunctionCall(
    //   {
    //     name: "buytokens",
    //     type: "function",
    //     inputs: [
    //       {
    //         type: "uint",
    //         name: "_value",
    //       },
    //     ],
    //   },
    //   [sending]
    // );

    // console.log("This is the encoded data", data);

    // const txmeta = {
    //   from: walletaddress,
    //   to: contract2.options.address,
    //   value: Number(sending).toString(16), // this is the value in wei to send
    //   data: data,
    // };

    // const txHash = await window.ethereum.request({
    //   method: "eth_sendTransaction",
    //   params: [txmeta],
    // });

    // let value = await contract2.methods.buytokens(sending).send({
    //   from: walletaddress,
    //   value: sending,
    // });
    // console.log(typeof value);
    // console.log(web3.utils.toNumber(value));

    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = await new ethers.Contract(
      contract2.options.address,
      EthSwap.abi,
      signer
    );

    let data1 = await contract.tp({
      from: walletaddress,
    });

    console.log(data1);
    console.log("This is the data1", data1.toString());

    let balance1 = await contract.getBalancesofsmartcontract({
      from: walletaddress,
    });

    console.log(
      "This is the balance of the smart contract before the function was called",
      balance1.toString()
    );

    //This is the test function being called
    //Before the updation of state variable
    let data = await contract.gettestvariable({
      from: walletaddress,
    });

    console.log("This is the test variable before updation", data);

    let data3 = await contract.tp3({
      from: walletaddress,
      value: 0.001,
    });

    console.log("This is the boolean value", data3);

    data = await contract.gettestvariablle({
      from: walletaddress,
    });

    console.log("This is the test variable after updation", data);

    // let tp2 = await contract.tp2({
    //   from: walletaddress,
    //   value: sending,
    // });

    // console.log(tp2);
    // console.log(tp2.toString());
    // let data = await contract.buytokens({
    //   from: walletaddress,
    //   value: sending,
    // });

    // console.log("This is the data", data.data.toString());
    // console.log("This is the r", data.r.toString());
    // console.log("This is the s", data.s.toString());
    // console.log("This is the value", data.value.toString());

    // let balance2 = await contract.getBalancesofsmartcontract({
    //   from: walletaddress,
    // });

    // console.log(
    //   "This is the balance of the smart contract after the function was called",
    //   balance2.toString()
    // );

    // console.log(data.value.toString());

    //These errors suck!
    // console.log("buy tokens function is called");
    // let amount = await contract2.methods.tokenstotransfer(walletaddress).call();
    // console.log(
    //   "The amount of tokens that the wallet address should receive",
    //   amount
    // );

    //Now the ethers are deducted from the account
    // //We need to transfer the tokens to the account
    // let ownerhas = await contract1.methods
    //   .balanceOf("0x6fC88f402E6e8AaC089366F95186dB80675f771d")
    //   .call();
    // console.log("The amount of tokens that the owner has", ownerhas);

    // let tokenstransfer = await contract1.methods
    //   .transfering(walletaddress, amount)
    //   .call();

    // let ownerhas2 = await contract1.methods
    //   .balanceOf("0x6fC88f402E6e8AaC089366F95186dB80675f771d")
    //   .call();
    // console.log("The amount of tokens that the owner has", ownerhas2);
    let amounting;

    // console.log(tokenstransfer);

    amounting = await contract1.methods.balanceOf(walletaddress).call();
    console.log("The amount of tokens in the wallet is", amounting);

    let updatedwalletbalance = await contract2.methods
      .getBalances(walletaddress)
      .call();
    updatedwalletbalance = web3.utils.fromWei(
      `${updatedwalletbalance}`,
      "ether"
    );
    let updatedwallettokens = await contract1.methods
      .balanceOf(walletaddress)
      .call();

    setwalletbalance(updatedwalletbalance);
    setwallettoken(updatedwallettokens);
  }

  async function btnclicked2() {
    //First of all we are going to call the selltokens function of the EthSwap smart contract
    let { web3, contract1, contract2 } = state;
    await contract2.methods.selltokens(tokenssell, walletaddress).send({
      from: walletaddress,
    });

    //Now after selltokens function is called let us first print the balance of the sender
    let balanceofsender = await web3.eth.getBalance(walletaddress);
    console.log("The balance of the sender now is", balanceofsender);
    balanceofsender = await web3.utils.fromWei(`${balanceofsender}`, "ether");

    //Hence the ethers are now credited to the account balance
    //We now need to transfer these tokens from the account to the owner of the smart contract

    //Also the tokens are deducted from the wallet address
    let finallytokens = await contract1.methods.balanceOf(walletaddress).call();
    console.log(finallytokens);

    setwalletbalance(balanceofsender);
    setwallettoken(finallytokens);
  }

  //This is the function that is used for connecting the metamask wallet with the current application
  async function connectwallet() {
    //Checking if the metamask wallet exists
    if (window.ethereum) {
      console.log("Metamask wallet detected");

      //Now as the metamask wallet is detected we now get the details of all the accounts
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log(accounts);
      setwalletaddress(accounts.toString());
      let walletbalance = await state.web3.eth.getBalance(accounts.toString());
      console.log("This is the wallet balance", walletbalance);
      let wallettoken = await state.contract1.methods
        .balanceOf(accounts.toString())
        .call();
      console.log(wallettoken);
      setwallettoken(wallettoken);
      setwalletbalance(state.web3.utils.fromWei(walletbalance, "ether"));
      setexists(true);
    } else {
      alert("The metamask wallet is not detected");
    }
  }

  // return <div>Welcome to the Dhruv App</div>;

  return (
    <div>
      <h1>Welcome to Dhruv's CryptoCurrency Exchange</h1>
      <button onClick={connectwallet}>Connect the Wallet</button>
      {exists && (
        <div>
          <h2>Account Info</h2>
          <h4>Wallet address : {walletaddress}</h4>
          <h4>Wallet ether balance:{walletbalance} ethers</h4>
          <h4>Wallet token balance:{wallettoken} Satoshi Soni tokens</h4>
          <br />
          <h2>Buy tokens</h2>
          <label>Enter the amount in ethers</label>
          <input
            value={ethersbuy}
            onChange={(e) => {
              setethersbuy(() => {
                settokensbuy(e.target.value * 100);
                return e.target.value;
              });
            }}
          ></input>
          <label>The amount of tokens</label>
          <input readOnly value={tokensbuy}></input>
          <button onClick={btnclicked}>Swap</button>
          <br />
          <h2>Sell tokens</h2>
          <label>Enter the amount in tokens</label>
          <input
            value={tokenssell}
            onChange={(e) => {
              settokenssell(() => {
                setetherssell(e.target.value / 100);
                return e.target.value;
              });
            }}
          ></input>
          <label>The amount of ethers</label>
          <input readOnly value={etherssell}></input>
          <button onClick={btnclicked2}>Swap</button>
        </div>
      )}
    </div>
  );
}

export default App;
