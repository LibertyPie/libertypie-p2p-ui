<template>
  <div class="d-flex align-self-stretch flex-column justify-content-center align-items-center h100 py-10">
    <button @click.prevent="doConnectWallet" class="btn btn-primary btn-lg">
        {{$t("connect_wallet")}}
    </button>
    <p class="text-center my-2 text-muted">
        {{(msg != null) ? msg : $t("connect_wallet_to_continue")}}
    </p>
  </div>
</template>

<script>
export default {
    props: {
        msg: {
            type: String,
            default: null
        }
    },
    name: "wallet-connect-btn",
    
    beforeMount(){
        this._on("on-wallet-connect",(e)=>{
          this.$emit("connected",e.detail)
        })
    },

    methods: {
        doConnectWallet(){
            window.dispatchEvent(new CustomEvent("connect_wallet"))
        }
    }
}
</script>

<style>

</style>