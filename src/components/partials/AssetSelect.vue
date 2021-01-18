<template>
    <select  class="asset_select form-control form-control-lg" :data-placeholder="$t('asset')">
        <option value="" selected disabled class="">{{$t("asset")}}</option>
        <option v-for="(asset,i) in cryptoAssets" :key="i" :data-symbol="asset['originalSymbol']">
            {{asset["originalName"]}} 
        </option>
    </select>
</template>

<script>
import Shimmer from './Shimmer.vue'
export default {
  components: { Shimmer },
    data(){
        return {
            isLoading: true,
            cryptoAssets: null
        }
    },
    async beforeMount(){
        this.isLoading = true
        this.$emit("is-loading")
        this.cryptoAssets =  (await this.$libertypie.fetchAssets()).getData() || []
        this.isLoading = false
        this.$emit("has-loaded")
    },

    mounted(){
        let _this = this;
        $(function(){
            $(".asset_select").select2({
                placeholder: _this.$t("asset")
            })
        })
    }
}


function formatItem(state){
    if (!state.id) return state.text;
    

}
</script>

<style>

</style>

