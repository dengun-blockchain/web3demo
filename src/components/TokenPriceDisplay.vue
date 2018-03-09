<template>
  <!-- SHAME: useless div is just here because the template must have a single child -->
  <div>
    <div v-if="currencyValue">
      Value per token: {{ currencyValue }} {{ currency }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TokenPriceDisplay',
  computed: {
    ...mapState(['currencyValue', 'currency'])
  },
  mounted: function () {
    let { currencyValue, currency } = this.$store.state

    // either fetching data failed or wasn't done yet!
    if (!currencyValue) {
      this.$http.get(
        // SHAME: this could be set in a config file or something...
        `/currency-api/ethereum/?convert=${currency.toUpperCase()}`
      ).then(data => {
        this.$store.commit('setCurrencyValue', data.body[0][`price_${currency.toLowerCase()}`])
      }).catch(e => {
        // TODO: c'mon! You can improve this!
        alert(e)
      })
    }
  }
}
</script>
