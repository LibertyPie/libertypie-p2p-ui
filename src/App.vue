<template>
  <router-view/>
  <div></div>
</template>

<script>
require("./assets/styles/style.scss")
import _WalletProvider from './classes/_WalletProvider'

export default {
  data(){
    return{
      walletPorivider: null,
      isConnected: false
    }
  },
  mounted(){
    this.walletPorivider = new _WalletProvider(this);
  }
}
</script>
