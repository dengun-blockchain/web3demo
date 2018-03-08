<template>
  <!-- SHAME: useless div is just here because the template must have a single child -->
  <div>
    <div v-if="value">
      Value per token: {{ value }} {{ currency }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TokenPriceDisplay',
  computed: {
    // TODO: set this to get value from store
    currency: function () {
      return this.$store.state.currency
    },
    // TODO: discuss whether this is adequate. It might be 0, for example
    value: function () {
      return this.$store.state.currencyValue
    }
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
