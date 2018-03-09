<template>
  <!-- SHAME: useless div is just here because the template must have a single child -->
  <div>
    <v-alert type="error" :value="error">
      {{ error }}
    </v-alert>

    <form action="#" enctype="multipart/form-data" @submit="submitForm">
      <v-text-field
        name="file"
        label="Password"
        v-model="password"
        type="password"
      ></v-text-field>
      <label for="file">File</label>
      <input id="file" type="file" name="file" @change="updateFile">
      <v-btn type="submit">submit</v-btn>
    </form>
  </div>
</template>

<script>
export default {
  name: 'KeyStoreAuthForm',
  data: function () {
    return {
      file: null,
      password: null,
      privateKey: null,
      walletAddress: null,
      etherBalance: null,
      error: null
    }
  },
  methods: {
    updateFile: function (e) {
      const fileList = e.target.files
      // eslint-disable-next-line
      this.file = fileList.length > 0 && fileList[0] || null
    },
    getWalletData: function (keyStoreData) {
      const web3 = this.$store.state.web3

      if (keyStoreData.Crypto) {
        // places like MyEtherWallet provide keystore
        // data with Crypto instead of 'crypto',
        // the expected value from web3
        keyStoreData.crypto = keyStoreData.Crypto
      }

      try {
        let { privateKey, address: walletAddress } = web3.eth.accounts.decrypt(keyStoreData, this.password)

        web3.eth.getBalance(walletAddress)
          .then((balance) => {
            const etherBalance = web3.utils.fromWei(balance)

            this.$store.commit('setWalletData', {
              privateKey,
              walletAddress,
              etherBalance
            })
          })
          .catch(e => {
            // TODO: treat errors from getBalance
            this.error = e.message
          })
      } catch (e) {
        // TODO: treat errors from trying to decrypt the keyStore
        this.error = e.message
      }
    },
    submitForm: function (e) {
      e.preventDefault()

      this.error = null

      if (this.file) {
        const fileReader = new FileReader()

        fileReader.onload = fileEvent => {
          if (fileEvent.target.readyState === FileReader.DONE) {
            // TODO: treat error that might occur from an unreadable file
            this.getWalletData(JSON.parse(fileEvent.target.result))
          }
        }

        fileReader.readAsBinaryString(this.file)
      }
    }
  }
}
</script>
