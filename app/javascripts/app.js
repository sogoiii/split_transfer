'use strict';
let accounts; //all accounts
let main; //this is the From account
let userA; //hardcoded userA
let userB; //hardcoded userB


/**
 * From wei to ether
 * @param  {String || Number} value amount to convert
 * @return {String}           return value is amount of ether
 */
function toEther(value){
  return web3.fromWei(value, 'ether').toString();
}

/**
 * set dom element id and value to updated. Is a closure because it was part of a promise chain, But no longer needs to be a closure
 * @param {function} element that accepts a value to set
 */
function setBalanceValue(element){
  return function(value){
    let balance_element = document.getElementById(element);
    balance_element.innerHTML = toEther(value);
  }
}


/**
 * Uses global variables, to updated the amount of ether in accounts.
 * @return {} []
 */
function refreshAccounts(){
  let userABalance = web3.eth.getBalance(userA).toString(10);
  let userBBalance = web3.eth.getBalance(userB).toString(10);

  setBalanceValue('userA')(userABalance);
  setBalanceValue('userB')(userBBalance);

  if(typeof main !== 'undefined'){
    let etherBalance = web3.eth.getBalance(main).toString(10);
    setBalanceValue('fromEther')(etherBalance);
  }
}

/**
 * Calls Solidity contract splitSend to split ether.
 * @return {} []
 */
function splitSend(){
  let meta = SplitTransfer.deployed();
  let amount = document.getElementById("amount").value;
  let actualValue = web3.toWei(amount, 'ether');

  meta.splitSend.sendTransaction(actualValue, {from: main,  value: actualValue, gas: 350000}).then(function() {
     refreshAccounts(); //these are from testrpc
  }).catch(function(e) {
    console.log(e);
  });
}



/**
 * When the From input field is set, call this method.
 * @return {}
 */
function fromUserFilled(){
  let address = document.getElementById("senderAddress").value;
  if(web3.isAddress(address)){
      main = address;
      let etherBalance = web3.eth.getBalance(address).toString(10);
      setBalanceValue('fromEther')(etherBalance);
  }
}

window.onload = function() {
  web3.eth.getAccounts(function(err, accounts) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accounts.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    userA = accounts[5];
    userB = accounts[4];
    refreshAccounts(); //these are from testrpc
  });
}
