'use strict';
var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function handleError(e){
  console.log('I Encountered an error');
  console.log(e.message);
  console.log(e.stack);
}

function toEther(value){
  return web3.fromWei(value, 'ether').toString();
}

function setBalanceValue(element){
  return function(value){
    let balance_element = document.getElementById(element);
    balance_element.innerHTML = toEther(value);
  }
}



function refreshAccounts(accounts){
  var meta = MetaCoin.deployed();

  meta.getBalance.call(accounts[0], {from: account})
      .then(setBalanceValue('userA'))
      .catch(handleError)

  meta.getBalance.call(accounts[1], {from: account})
      .then(setBalanceValue('userB'))
      .catch(handleError)

}

function refreshBalance() {
  var meta = MetaCoin.deployed();

  meta.getBalance.call(account, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function sendCoin() {
  var meta = MetaCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};


function splitSend(){
  let meta = MetaCoin.deployed();
  let amount = document.getElementById("amount").value;
  let actualValue = web3.toWei(amount, 'ether');
  meta.splitSend(actualValue, {from: account})
      .then(function(r){
        console.log('---splitSend--');
        console.log(r);
        console.log('---splitSend--');
      })
      .then(function(){
        refreshAccounts([accounts[5], accounts[4]]);
      })
      .catch(function(e){
        console.log('---splitSend-err-');
        console.log(e);
        console.log('---splitSend-err-');
      });
}

function getAddressB() {
  var meta = MetaCoin.deployed();

  meta.getAddressB().then(function(r){
    console.log('---get--');
    console.log(r);
    console.log('---get--');
  });
}

var accountB = "0x1907df9261416697c80d44363ea90115e5a4067c";
function setAddressB(){
  var meta = MetaCoin.deployed();
  meta.setAddressB(accountB, { from: account}).then(function(r){
    console.log('---set--');
    console.log(r);
    console.log('---set--');
  });
}

function getAccount(account) {
  var meta = MetaCoin.deployed();
  meta.getBalance.call(account)
      .then(function(r){
        console.log('---getAccount--');
        let inEth = web3.fromWei(r, 'ether');
        console.log(inEth.toString());
        console.log('---getAccount--');
      })
      .catch(function(e){
        console.log('---getAccount-err-');
        console.log(r);
        console.log('---getAccount-err-');
      })
}



window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    refreshBalance();
    refreshAccounts([accounts[5], accounts[4]]);
  });
}
