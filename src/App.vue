<template>
  <router-view/>
  <div></div>
</template>

<script>
require("./assets/styles/style.scss")
import _WalletProvider from './classes/_WalletProvider'
import LogRocket from 'logrocket';


//init logging 
//declarations first before initialization
LogRocket.init('wtpj8t/libertypie');


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
