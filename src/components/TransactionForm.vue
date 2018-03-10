<template>
  <!-- SHAME: useless div is just here because the template must have a single child -->
  <div>

    <v-alert type='success' :value="receipt" outline>
      Transaction Sent!
    </v-alert>

    <v-alert type='info' :value="hash" outline>
      <a :href="'https://ropsten.etherscan.io/tx/'+hash" target="_blank">See on EtherScan</a>
    </v-alert>

    <v-alert type="error" :value="error" outline>
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
      <v-btn type='submit' :disabled="sending">submit</v-btn>
      <div v-if="sending">
        <v-progress-circular indeterminate :size="20" color="primary"></v-progress-circular>
        Sending transaction, please wait...
      </div>
    </form>
    <v-divider></v-divider>
    <div v-if='receiver'> Receiver: {{receiver}} </div>
    <div v-if='amount'> Amount ({{currency}}): {{amount}} </div>
    <div v-if='ethereumValue'> (in Ethereum): {{ethereumValue}} </div>
    <!-- SHAME: why not add this to a separate component? -->
    <div v-if="gasPrice">
      <div>Gas price: {{ gasPrice }}</div>
      <div>Gas limit: {{ gasLimit }}</div>
      <div>Tx: {{ txFee }}</div>
    </div>
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
      receipt: null,
      hash: null,
      error: null,
      sending: false
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
    // SHAME: in the end, gas was a better name altogether
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

      this.sending = true

      web3.eth.accounts.signTransaction(txObject, this.$store.state.privateKey)
        .then(signed => {
          var tran = web3.eth.sendSignedTransaction(signed.rawTransaction)

          tran.on('transactionHash', hash => {
            this.hash = hash
          })

          tran.on('receipt', receipt => {
            this.receipt = receipt
            this.sending = false
          })

          tran.on('error', error => {
            this.error = error.message
            this.sending = false
          })
        }).catch(e => {
          this.error = e.message
          this.sending = false
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
