function callWhenMined(txHash, callback) {
    web3.eth.getTransactionReceipt(txHash, function(error, rcpt) {
        if (error) {
            console.log(error);
        } else {
            if (rcpt == null) {
                setTimeout(function() {
                    callWhenMined(txHash, callback);
                }, 500);
            } else {
                callback();
            }
        }
    });
}
