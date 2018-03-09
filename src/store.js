import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: new Web3(Web3.givenProvider || 'https://ropsten.infura.io/UuwLWxYoBFFRPEAAzBwK'),
    currencyValue: null,
    currency: 'USD',
    privateKey: null,
    walletAddress: null,
    etherBalance: 0,
    gasPrice: null,
    gasLimit: 21000
  },
  mutations: {
    setCurrencyValue: (state, payload) => { state.currencyValue = payload },
    setWalletData: (state, payload) => {
      state.walletAddress = payload.walletAddress
      state.etherBalance = payload.etherBalance
      state.privateKey = payload.privateKey
    },
    setGasPrice: (state, payload) => {
      state.gasPrice = payload
    }
  }
})
