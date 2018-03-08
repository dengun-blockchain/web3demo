<template>
  <!-- SHAME: useless div is just here because the template must have a single child -->
  <ul style="list-style: none">
      <li>Wallet Address: {{ walletAddress }}</li>
      <li>Ether Balance: {{ etherBalance }}</li>
  </ul>
</template>

<script>
export default {
  name: 'TokenPriceDisplay',
  computed: {
    // TODO: set this to get value from store
    privateKey: function () {
      return this.$store.state.privateKey
    },
    walletAddress: function () {
      return this.$store.state.walletAddress
    },
    etherBalance: function () {
      return this.$store.state.etherBalance
    }
  }
}
</script>
