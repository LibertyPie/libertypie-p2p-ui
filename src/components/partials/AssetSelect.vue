<template>
    <select  class="asset_select form-control form-control-lg" :data-placeholder="$t('asset')">
        <option value="" selected disabled class="">{{$t("asset")}}</option>
        <option 
            v-for="(asset,i) in cryptoAssets" 
            :key="i" 
            :data-symbol="asset['originalSymbol']"
        >
            {{asset["originalName"]}} 
        </option>
    </select>
</template>

<script>
import Vue from 'vue'

export default {
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
                placeholder: _this.$t("asset"),
                templateResult: _this.formatItem,
                templateSelection: _this.formatItem
            })
        })
    },

    methods: {

        formatItem(state){
            console.log(state)
            if (!state.id) return state.text;

            let symbol = state.element.dataset.symbol;
            let  img = `<img src='/assets/images/cryptos/${symbol.toLowerCase()}.svg' class="s2_icon" width='18' alt='' />`; 
            let text = `<span>${symbol.toUpperCase()}&nbsp;<span  class='asset_name'>${state.text}</span>`
            return $(`<span class='asset_select_item'>${img} ${text}</span>`);
       }

    }
}


</script>

