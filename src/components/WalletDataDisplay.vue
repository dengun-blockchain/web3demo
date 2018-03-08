<template>
  <!-- SHAME: useless div is just here because the template must have a single child -->
  <ul>
      <li>Private Key: {{ privateKey }}</li>
      <li>Wallet Address: {{ walletAddress }}</li>
      <li>Ether: {{ privateKey }}</li>
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
