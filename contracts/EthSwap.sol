//SPDX-License-Identifier:MIT
import './Tokens.sol';

pragma solidity >=0.5.0 <0.9.0;
contract EthSwap{
    //First we are going to have an instance variable which is the instance of the deployed token
    Dhruv public token;
    address public owneroftokens;

    //This is the test variable
    uint public testvariable=0;

    function gettestvariable() public view returns(uint)
    {
        return testvariable;
    }

    //Mapping for the tokens to transfer
    mapping(address=>uint) public tokenstotransfer;

    //With the help of this constructor we will be able to interact with the tokens smart contract instance
    constructor(address othercontract) public
    {
        token=Dhruv(othercontract);
        owneroftokens=token.owneroftokens();
    }

    function getbalance(address account) public view returns(uint){
        uint balance=token.balanceOf(account);
        return balance;
    }

    function tp() public pure returns(uint)
    {
        return 5;
    }


    //Now this is the function where one can buy the tokens
    //Intially as all the tokens are available with the owner
    //We will transfer the tokens from owner of the smart contract to the person calling it

    function buytokens() public payable returns(uint)
    {
        uint balance=getBalances(msg.sender);
        require(msg.value<=balance,"The balance of the sender must be greater than the value send inside the msg");
        //This means that the ethers are received in the ethswap smart contract and now we need to assign the tokens to the sender account
        uint value=msg.value;
        value/=1000000000000000000;
        value*=100;
        tokenstotransfer[msg.sender]=value;
        bool success=token.transfering(msg.sender,value);
        require(success==true,"The transfer of tokens is successful");
        return 6;
        
    }

    function tp3() external payable returns(bool)
    {
        testvariable=5;
        return true;
    }
    function tp2() external payable returns(uint)
    {
        return 6;
    }


    //This function returns the ether balance of the smart contract EthSwap
    function getBalancesofsmartcontract() public view returns(uint)
    {
        return address(this).balance;
    }

    function getBalances(address get) public view returns(uint)
    {
        return address(get).balance;
    }

    //Now this is the function for selling the tokens
    //In this function the user calls the function and passes the tokens that the user has
    //In exchange of the tokens that the user passed all these tokens are send to the owner and in exchange the user gets the ethers
    //The ethers he/she gets depends on the amount of tokens
    function selltokens(uint tokenstosell,address payable sender) public payable {
        // address payable seller;
        //The transfer of the tokens can only take place with the help of the instance of the token
        //However here we are going to transfer the ethers from the smart contract to the the account
        require(tokenstosell<=tokenstotransfer[sender],"The tokens are not sufficient");

        //In our case the etherstotransfer part will be dynamic
        //It will change depending upon the graph function
        uint etherstotransfer=tokenstosell*1000000000000000000;
        etherstotransfer/=100;
        sender.transfer(etherstotransfer);
        token.transfer(msg.sender,tokenstosell);
        // seller.transfer(tokenstosell/100);
    }

}
