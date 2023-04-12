//SPDX-License-Identifier:UNLICENSED

pragma solidity >=0.5.0 <0.9.0;

//There are 2 ways to implement the ERC20 interface

//First is to just import the contract that is written by the open Zipplen which is a security company
//if a security company such as Open Zeppelin is providing the community with certified contracts, then,
// It is better leverage the ERC20 token logic creation to a security company, and focus on the contracts for application

//The second way is to just copy paste the interface that is written in the ethereum community

interface ERC20Interface { 
    function totalSupply() external view returns (uint);
    function balanceOf(address tokenOwner) external view returns (uint balance); 
    function transfering(address to, uint tokens) external returns (bool success);

    function allowance(address tokenOwner, address spender) external view returns (uint remaining);
    function approve(address spender, uint tokens) external returns (bool success);
    function transferFrom(address from, address to, uint tokens) external returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

//Hence these are all the functions that we need to implement in our contract.

//Now this is our smart contract which is going to implement all these functions 
contract Dhruv is ERC20Interface{

    //This is the name of the tokens
    string public name="Satoshi Soni";

    //This is the symbol of the tokens
    string public symbol="SDS";

    //This is the decimal places upto which the token can be divided
    uint public decimals=0;

    //This is the total supply of the tokens that will be available
    //There are 1 million tokens
    uint public totalsupply=1000000;

    //This is the address of the owner of the smart contract
    address public owneroftokens;

    //This is the mapping which maps each address to the amount of tokens that the address holds
    mapping(address=>uint) public accounts;

    constructor() public{
        accounts[msg.sender]=totalsupply;
        owneroftokens=msg.sender;
    }

    function owner() public view returns(address)
    {
        return msg.sender;
    }


    //Now we are going to implement the totalSupply function which returns the total supply of the tokens
    function totalSupply() public view returns(uint)
    {
        return totalsupply;
    }

    //This function implements the balanceOf function
    function balanceOf(address tokenowner) public view returns(uint)
    {
        return accounts[tokenowner];
    }

    //This function implements the transfer function
    //In this function we are transferring the tokens from the owner of the smart contract to the sender
     function transfering(address to, uint tokens) public returns (bool success)
     {
         require(accounts[owneroftokens]>=tokens,"The sender cannot send more than what he/she owns");
         uint change1=accounts[owneroftokens];
         change1-=tokens;
         accounts[owneroftokens]=change1;

        uint change2=accounts[to];
         change2+=tokens;
         accounts[to]=change2;
        //  accounts[owneroftokens]=accounts[owneroftokens]-tokens;
        //  accounts[to]=accounts[to]+tokens;
         emit Transfer(owneroftokens, to, tokens);
         return true;
     }

     //In this function we are transferring the tokens from the sender to the owner
     function transfer(address from,uint tokens) public returns(bool success)
     {
         require(accounts[from]>=tokens,"The sender cannot send more than what he/she owns");
         uint change1=accounts[from];
         change1-=tokens;
         accounts[from]=change1;

        uint change2=accounts[owneroftokens];
         change2+=tokens;
         accounts[owneroftokens]=change2;
        //  accounts[owneroftokens]=accounts[owneroftokens]-tokens;
        //  accounts[to]=accounts[to]+tokens;
         emit Transfer(from,owneroftokens , tokens);
         return true;
     }

     mapping(address=>mapping(address=>uint)) public approved;

     //This is the approve function which means that the sender approves the to that he/she can spend this much of money
     //It is like writing a cheque to another person
     function approve(address spender, uint tokens) public returns (bool success)
     {
         require(accounts[msg.sender]>=tokens,"It should be greater");
         require(tokens>0);
         approved[msg.sender][spender]=tokens;
         emit Approval(msg.sender, spender, tokens);
         return true;
     }

     function allowance(address tokenOwner, address spender) public view returns (uint)
    {
        return approved[tokenOwner][spender];
    }

    function transferFrom(address from,address to,uint tokens) public returns(bool)
    {
        //We first need to check in the approved mapping whether the tokens are greater than the argument
        require(approved[from][msg.sender]>=tokens);
        require(accounts[from]>=tokens);

        accounts[from]-=tokens;
        accounts[to]+=tokens;
        approved[from][msg.sender]-=tokens;

        emit Transfer(from,to,tokens);
        return true;

    }


}

