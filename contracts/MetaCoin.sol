pragma solidity ^0.4.2;

import "ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin {
	mapping (address => uint) balances;


	address userA = 0xb11dabc2e09bae3ecfadff742d4792ec3389cffd;
	address userB = 0x1907df9261416697c80d44363ea90115e5a4067c;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function MetaCoin() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		Transfer(msg.sender, receiver, amount);
		return true;
	}

	function splitSend(uint _value) returns(bool) {
			uint split = (_value / 2);
			balances[userA] += split;
			balances[userB] += split;
			return true;
	}

	function getBalanceInEth(address addr) returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) returns(uint) {
		return balances[addr];
	}


	function getAddress() constant returns (address) {
		return userA;
	}

	function getAddressB() constant returns (address) {
		return userB;
	}

	function setAddressB(address _addrB) returns (bool){
		userB = _addrB;
		return true;
	}


}
