pragma solidity ^0.4.2;

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract SplitTransfer {

	address owner;

	function SplitTransfer() {
		owner  = msg.sender;
	}

	function remove() {
		if(msg.sender == owner){
			selfdestruct(owner);
		}
	}


	event LogTransferSplit(address indexed _from, address indexed _userA, address indexed _userB, uint _value);
	function splitSend(address _userA, address _userB) payable returns(bool) {
			uint split = (msg.value / 2);

			if(_userA == 0 || _userB == 0) throw;

			if (!_userA.send(split) || !_userB.send(split) )
				throw;

			LogTransferSplit(msg.sender, _userA, _userB, split);
			return true;
	}

}
