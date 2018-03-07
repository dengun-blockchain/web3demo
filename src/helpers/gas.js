import Web3 from 'web3'

let web3

var currentGasPrice = () => {
    let gasPrice = web3.eth.gasPrice;
    return gasPrice;
}

module.exports = {
	currentGasPrice, // similar to addNote: addNote, using ES6 syntax (key and value are the same)

}
