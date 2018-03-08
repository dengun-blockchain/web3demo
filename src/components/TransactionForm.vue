<template>
  <!-- SHAME: useless div is just here because the template must have a single child -->
  <div>
    <form action="#" enctype="multipart/form-data" @submit="submitForm">
      <v-text-field
        name="amount"
        label="Amount"
        v-model="amount"
        type="number"
      ></v-text-field>
      <v-text-field
        name="receiver"
        label="Receiver"
        v-model="receiver"
        type="text"
      ></v-text-field>
      <div v-if="receiver"> Receiver: {{receiver}} </div>
      <div v-if="amount"> Amount ({{ethereumCurrency}}): {{amount}} </div>
      <div v-if="ethereumValue"> (in Ethereum): {{ethereumValue}} </div>
      <v-btn type="submit">submit</v-btn>
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
      return this.amount ? (this.amount / this.$store.state.currencyValue) : 0
    },
    ethereumCurrency: function () {
      return this.$store.state.currency
    }
  },
  methods: {
    processTransaction: function (keyStoreData) {

    },
    submitForm: function (e) {
      e.preventDefault()
    }
  }
}
</script>
