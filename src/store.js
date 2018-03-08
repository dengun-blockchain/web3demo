import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    web3: new Web3(Web3.givenProvider || 'ws://localhost:8546'),
    currencyValue: null,
    currency: 'USD',
    privateKey: null,
    walletAddress: null,
    etherBalance: 0
  },
  getters: {
    count: state => state.count,
    // SHAME: this could just return
    // a walletData object or something...
    privateKey: state => state.privateKey,
    walletAddress: state => state.walletAddress,
    etherBalance: state => state.etherBalance,
    web3: state => state.web3
  },
  mutations: {
    incrementCount: state => state.count++,
    decrementCount: state => state.count--,
    setCurrencyValue: (state, payload) => { state.currencyValue = payload },
    setWalletData: (state, payload) => {
      state.walletAddress = payload.walletAddress
      state.etherBalance = payload.etherBalance
      state.privateKey = payload.privateKey
    }
  }
})
