<template>
  <!-- SHAME: useless div is just here because the template must have a single child -->
  <div>
    <v-snackbar v-if='hashed'>
      Transaction Sent!
      <a v-if="receipt" :href="'https://ropsten.etherscan.io/tx/'+hash" target="_blank">See on EtherScan</a>
    </v-snackbar>

    <v-alert type="error" :value="error">
      {{ error }}
    </v-alert>

    <form action='#' enctype='multipart/form-data' @submit='submitForm'>
      <v-text-field
        name='amount'
        label='Amount'
        v-model='amount'
        type='number'
      ></v-text-field>
      <v-text-field
        name='receiver'
        label='Receiver'
        v-model='receiver'
        type='text'
      ></v-text-field>
      <div v-if='receiver'> Receiver: {{receiver}} </div>
      <div v-if='amount'> Amount ({{currency}}): {{amount}} </div>
      <div v-if='ethereumValue'> (in Ethereum): {{ethereumValue}} </div>
      <v-btn type='submit'>submit</v-btn>
    </form>

    <!-- SHAME: why not add this to a separate component? -->
    <div v-if="gasPrice">
      <div>Gas price: {{ gasPrice }}</div>
      <div>Gas limit: {{ gasLimit }}</div>
      <div>Tx: {{ txFee }}</div>
    </div>
    <v-divider></v-divider>
    <h3 v-if='receipt'>
      <u>Transaction Received</u>
    </h3>
    <h3 v-if='confirmations'>
      Confirmations: {{ confirmations }}
    </h3>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TransactionForm',
  data: function () {
    return {
      amount: null,
      receiver: null,
      // TODO: set these as state data later
      hashed: false,
      receipt: null,
      hash: null,
      confirmations: 0,
      error: null
    }
  },
  computed: {
    ...mapState([
      'currency',
      'gasPrice',
      'gasLimit',
      'walletAddress',
      'privateKey'
    ]),
    txFee: function () {
      let { gasPrice, gasLimit } = this.$store.state

      return gasPrice ? gasPrice * gasLimit : null
    },
    ethereumValue: function () {
      return this.amount ? this.amount / this.$store.state.currencyValue : 0
    }
  },
  methods: {
    processTransaction: function () {
      const web3 = this.$store.state.web3

      let txObject = {
        from: this.walletAddress,
        to: this.receiver,
        value: web3.utils.toWei(
          this.ethereumValue.toString(), 'ether'
        ),
        // web3 deduces the gas price automatically
        // gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(this.txFee)
      }

      web3.eth.accounts.signTransaction(txObject, this.$store.state.privateKey)
        .then(signed => {
          var tran = web3.eth.sendSignedTransaction(signed.rawTransaction)

          tran.on('confirmation', (confirmationNumber, receipt) => {
            this.hashed = true
            this.confirmations++
          })

          tran.on('transactionHash', hash => {
            this.hash = hash
          })

          tran.on('receipt', receipt => {
            console.log(receipt)
            this.receipt = receipt
          })

          tran.on('error', error => {
            this.error = error.message
          })
        })
    },
    submitForm: function (e) {
      e.preventDefault()

      this.error = null

      this.processTransaction()
    }
  },
  mounted: function () {
    let { web3 } = this.$store.state

    // SHAME: ended up not using a separate function. Sorry, mate!
    web3.eth.getGasPrice().then((rawGasPrice) => {
      this.$store.commit('setGasPrice', web3.utils.fromWei(rawGasPrice, 'Gwei'))
    })
  }
}
</script>
