import web3 from 'web3'

export default {
  currentGasPrice: () => {
    return web3.eth.gasPrice
  }
}
