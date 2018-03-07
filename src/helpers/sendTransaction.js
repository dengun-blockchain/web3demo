import web3 from 'web3'


let sendTransaction = function (from, to, value, gas, gasPrice, data, nonce) {
  let txObject = {
    from: from,
    to: to,
    value: value,
    gas: gas,
    gasPrice: gasPrice,
    data: data,
    nonce: nonce
  };
  web3.eth.sendTransaction(txObject)
    .once('transactionHash', (hash) => {
      console.log("Tansaction hashed");
    })
    .once('receipt', (receipt) => {
      console.log("reciept");
    })
    .on('confirmation', (confNumber, receipt) => {
      console.log("Confirmed");
    })
    .on('error', function (error) {
      console.log("error");
    })
    .then(function (receipt) {
      // will be fired once the receipt its mined
      console.log("mined");
    });
};
