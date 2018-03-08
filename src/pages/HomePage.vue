<template>
  <v-layout justify-center class="home-page">
    <v-flex xs12 sm8 md6 lg4>
      <v-card>
        <v-card-text>
          <div v-if="privateKey">
            <TransactionForm></TransactionForm>
            <WalletDataDisplay></WalletDataDisplay>
          </div>
          <KeyStoreAuthForm v-else></KeyStoreAuthForm>
          <TokenPriceDisplay></TokenPriceDisplay>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import KeyStoreAuthForm from '@/components/KeyStoreAuthForm.vue'
import TokenPriceDisplay from '@/components/TokenPriceDisplay.vue'
import WalletDataDisplay from '@/components/WalletDataDisplay.vue'
import TransactionForm from '@/components/TransactionForm.vue'

export default {
  name: 'HomePage',
  components: {
    'KeyStoreAuthForm': KeyStoreAuthForm,
    'TokenPriceDisplay': TokenPriceDisplay,
    'WalletDataDisplay': WalletDataDisplay,
    'TransactionForm': TransactionForm
  },
  computed: {
    privateKey: function () {
      return this.$store.state.privateKey
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
