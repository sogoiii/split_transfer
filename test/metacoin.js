contract('MetaCoin', function(accounts) {
  it("should put 10000 MetaCoin in the first account", function() {
    var meta = MetaCoin.deployed();

    return meta.getBalance.call(accounts[0]).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });


  it('should call getAddress', function(done){
    var meta = MetaCoin.deployed();
    meta.getAddress.call().then(function(address){
      console.log(address);
      done();
    });
  });


  var accountB = "0x1907df9261416697c80d44363ea90115e5a4067c";
  it('should add address B', function(done){
    var meta = MetaCoin.deployed();
    meta.setAddressB(accountB, { from: accounts[0]}).then(function(r){
      console.log(r);
      done();
    });
  });

  it('should get address B', function(done){
    var meta = MetaCoin.deployed();
    meta.getAddressB.call().then(function(r){
      console.log(r);
      done();
    });
  })





  // it("should call a function that depends on a linked library", function() {
  //   var meta = MetaCoin.deployed();
  //   var metaCoinBalance;
  //   var metaCoinEthBalance;
  //
  //   return meta.getBalance.call(accounts[0]).then(function(outCoinBalance) {
  //     metaCoinBalance = outCoinBalance.toNumber();
  //     return meta.getBalanceInEth.call(accounts[0]);
  //   }).then(function(outCoinBalanceEth) {
  //     metaCoinEthBalance = outCoinBalanceEth.toNumber();
  //   }).then(function() {
  //     assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpeced function, linkage may be broken");
  //   });
  // });
  // it("should send coin correctly", function() {
  //   var meta = MetaCoin.deployed();
  //
  //   // Get initial balances of first and second account.
  //   var account_one = accounts[0];
  //   var account_two = accounts[1];
  //
  //   var account_one_starting_balance;
  //   var account_two_starting_balance;
  //   var account_one_ending_balance;
  //   var account_two_ending_balance;
  //
  //   var amount = 10;
  //
  //   return meta.getBalance.call(account_one).then(function(balance) {
  //     account_one_starting_balance = balance.toNumber();
  //     return meta.getBalance.call(account_two);
  //   }).then(function(balance) {
  //     account_two_starting_balance = balance.toNumber();
  //     return meta.sendCoin(account_two, amount, {from: account_one});
  //   }).then(function() {
  //     return meta.getBalance.call(account_one);
  //   }).then(function(balance) {
  //     account_one_ending_balance = balance.toNumber();
  //     return meta.getBalance.call(account_two);
  //   }).then(function(balance) {
  //     account_two_ending_balance = balance.toNumber();
  //
  //     assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
  //     assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  //   });
  // });







});
