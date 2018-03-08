<template>
  <!-- SHAME: useless div is just here because the template must have a single child -->
  <div>
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
      <v-text-field
        name='gasLimit'
        label='Gas Limit'
        v-model="gasLimit"
        v-bind='getGasLimit'
        type='text'
      ></v-text-field>
      <v-text-field
        name='gasPrice'
        label='Gas Price'
        v-model="gasPrice"
        v-bind='getGasPrice'
        type='text'
      ></v-text-field>
      <div v-if='receiver'> Receiver: {{receiver}} </div>
      <div v-if='amount'> Amount ({{ethereumCurrency}}): {{amount}} </div>
      <div v-if='ethereumValue'> (in Ethereum): {{ethereumValue}} </div>
      <v-btn type='submit'>submit</v-btn>
    </form>
    <hr style="margin:10px 0">

    <h3 v-if='hashed'>
      Transaction Sent!
      <a v-if="receipt" :href="'https://ropsten.etherscan.io/tx/'+hash" target="_blank">See on EtherScan</a>
    </h3>

    <h3 v-if='receipt'>
      <u>Transaction Received</u>
    </h3>
    <h3 v-if='confirmations'>
      Confirmations: {{ confirmations }}
    </h3>
  </div>
</template>

<script>
export default {
  name: 'TransactionForm',
  data: function () {
    return {
      amount: null,
      receiver: null,
      gasLimit: 21000,
      gasPrice: null,
      hashed: false,
      receipt: null,
      hash: null,
      confirmations: 0
    }
  },
  computed: {
    ethereumValue: function () {
      return this.amount ? this.amount / this.$store.state.currencyValue : 0
    },
    ethereumCurrency: function () {
      return this.$store.state.currency
    },
    getGasPrice: function () {
      let result = this.$store.state.web3.eth.getGasPrice().then((res) => {
        this.gasPrice = this.$store.state.web3.utils.fromWei(res, 'Gwei')
      })
      return result
    },
    getGasLimit: function () {
      return this.gasLimit
    }
  },
  methods: {
    processTransaction: function () {
      const web3 = this.$store.state.web3

      console.log(web3.utils.toWei(this.ethereumValue.toString(), 'ether'))

      let txObject = {
        from: this.$store.state.walletAddress,
        to: this.receiver,
        value: web3.utils.toWei(this.ethereumValue.toString(), 'ether'),
        gas: this.gas,
        gasPrice: this.gasPrice
      }

      web3.eth.accounts.signTransaction(txObject, this.$store.state.privateKey).then(signed => {
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

        tran.on('error', console.error)
      })
    },
    submitForm: function (e) {
      e.preventDefault()
      this.processTransaction()
    }
  }
}
</script>
