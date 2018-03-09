<template>
  <!-- SHAME: useless div is just here because the template must have a single child -->
  <ul style="list-style: none">
      <li>Wallet Address: {{ walletAddress }}</li>
      <li>Ether Balance: {{ etherBalance }}</li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TokenPriceDisplay',
  computed: {
    ...mapState(['walletAddress', 'etherBalance'])
  }
}
</script>
