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
        name='gas'
        label='Gas'
        v-model='gas'
        type='text'
      ></v-text-field>
      <div v-if='receiver'> Receiver: {{receiver}} </div>
      <div v-if='amount'> Amount ({{ethereumCurrency}}): {{amount}} </div>
      <div v-if='ethereumValue'> (in Ethereum): {{ethereumValue}} </div>
      <v-btn type='submit'>submit</v-btn>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TransactionForm',
  data: function () {
    return {
      amount: null,
      receiver: null,
      gas: null
    }
  },
  computed: {
    ethereumValue: function () {
      return this.amount ? this.amount / this.$store.state.currencyValue : 0
    },
    ethereumCurrency: function () {
      return this.$store.state.currency
    },
    gasPrice: function () {
      return 123456
    }
  },
  methods: {
    processTransaction: function () {
      const web3 = this.$store.state.web3
      let txObject = {
        from: this.$store.state.walletAddress,
        to: this.receiver,
        amount: this.ethereumValue,
        gas: this.gas,
        gasPrice: this.gasPrice
      }

      console.log(this.$store.state.privateKey)
      web3.eth.signTransaction(txObject, this.$store.state.privateKey).then(
        web3.eth.sendSignedTransaction
      )

      // web3.eth
      //   .sendTransaction(txObject)
      //   .once('transactionHash', hash => {
      //     console.log('Tansaction hashed')
      //   })
      //   .once('receipt', receipt => {
      //     console.log('reciept')
      //   })
      //   .on('confirmation', (confNumber, receipt) => {
      //     console.log('Confirmed')
      //   })
      //   .on('error', function (error) {
      //     console.log(error)
      //   })
      //   .then(function (receipt) {
      //     // will be fired once the receipt its mined
      //     console.log('mined')
      //   })
    },
    submitForm: function (e) {
      e.preventDefault()
      this.processTransaction()
    }
  }
}
</script>
