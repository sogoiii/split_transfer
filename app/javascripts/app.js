'use strict';
let accounts; //all accounts
let state = [
  {addressDOM: 'senderAddress', valueDOM: 'senderEther' },
  {addressDOM: 'userAAddress', valueDOM: 'userAEther' },
  {addressDOM: 'userBAddress', valueDOM: 'userBEther' }
];


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
  state.forEach(function(obj){
    let address = document.getElementById(obj.addressDOM).value;
    if(web3.isAddress(address)){
      let balance = web3.eth.getBalance(address).toString(10);
      setBalanceValue(obj.valueDOM)(balance);
    }
  });
}

/**
 * Calls Solidity contract splitSend to split ether.
 * @return {} []
 */
function splitSend(){
  let meta = SplitTransfer.deployed();
  let amount = document.getElementById("amount").value;
  let actualValue = web3.toWei(amount, 'ether');

  let main = document.getElementById(state[0].addressDOM).value;
  let userA = document.getElementById(state[1].addressDOM).value;
  let userB = document.getElementById(state[2].addressDOM).value;

  if(web3.isAddress(main) && web3.isAddress(userA) && web3.isAddress(userB)){ //if all valid
    meta.splitSend.sendTransaction(userA, userB, actualValue, {from: main,  value: actualValue, gas: 350000}).then(function(tx) {
        console.log('Transaction --> ' + tx);
        refreshAccounts();
    }).catch(function(e) {
      console.log(e);
    });
  }
}//end of splitSend



/**
 * When the From input field is set, call this method.
 * @return {}
 */
function filledAddress(domElement){
  let address = document.getElementById(domElement).value;
  if(web3.isAddress(address)){
      refreshAccounts();
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

    refreshAccounts(); //these are from testrpc
  });
}
