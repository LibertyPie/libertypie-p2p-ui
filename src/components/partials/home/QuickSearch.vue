<template>
    <div id="quick_search"> 
        
        <div class="row">
            <div class="col col-12">
                <div class="title_wrapper">  
                    <h1 class="text-white-80">{{ $t("search_offers") }}</h1>
                    <div class="text-white-60 subtitle">{{ $t("quick_search_desc") }}</div>
                </div>
            </div>

            <div class="col col-12   col-lg-10 bg-white rounded shadow  bg-white">
                <div class="row align-items-center">

                    <div class="col-12 col-sm-12 col-md-4 col-lg-3 vdivider">
                        <Loader v-show="isAssetLoading" :isLoading="isAssetLoading" />
                        
                        <div v-show="!isAssetLoading" class="input-group pr-2">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <img src="/assets/images/rec.svg" alt='' width="18" />
                                </span>
                            </div>
                            <AssetSelect
                                :showLoader="false"
                                @is-loading="isAssetLoading = true"
                                @has-loaded="isAssetLoading = false"
                            />
                        </div>

                    </div>
                    <div class="col-12 col-sm-12 col-md-4 col-lg-3 payment-method vdivider">
                        <a href="#" @click.prevent="isPTModalVisible=true"  class="d-flex align-items-center flex-row text-ellipsis">
                            <div class="pr-5 pl-4">
                                <img src="/assets/images/s_menu.svg" alt='' width="18" />
                            </div>
                                <div class="text-md pr-5 text-gray-700 text-ellipsis">
                                {{(Object.keys(paymentMethodInfo).length == 0) ? $t("payment_method") : paymentMethodInfo.name }}
                            </div>
                        </a>
                    </div>
                    <div class="col-12 col-sm-12 col-md-4 col-lg-3">
                        <div class="d-flex">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <img src="/assets/images/pin.svg" alt='' width="18" />
                                </span>
                            </div>
                            <div class="flex-grow-1">
                                <CountrySelect 
                                    cssClass="form-control-lg" 
                                    :placeholder="$t('location')"
                                    :selected="userCountry || ''"
                                    :key="userCountry"
                                />
                            </div>
                        </div>
                    </div> 
                    <div class="col-12 col-sm-12  col-lg-3 justify-self-center pb-3 pb-lg-0">
                        <button type="button" class="btn  btn-default btn-block text-capitalize">{{$t("search")}}</button>
                    </div>
                </div>
            </div>
            
            <PaymentTypesModal 
                :visible="isPTModalVisible"
                @on-hide="isPTModalVisible=false"
                @on-show="isPTModalVisible=true"
                @on-select="handleOnPaymenMethodSelect"
            />
          
        </div>
    </div>
</template>

<script>

import CountrySelect from "../CountrySelect"
import PaymentTypesModal from "../modals/PaymentTypes"
import Geo from '../../../classes/Geo'
import { mapState } from 'vuex'
import AssetSelect from '../AssetSelect.vue'

export default {
    components: {CountrySelect,PaymentTypesModal, AssetSelect},
    data(){
      
          return {
            isPTModalVisible: false,
            paymentMethodInfo: {},
            userCountry: "",
            isAssetLoading: false,
            cryptoAssets: []
        }
    },

    async beforeMount()  {
        this.$userCountry().then(c => this.userCountry = c);
    },

    methods: {

        async handleOnPaymenMethodSelect(info){
            this.paymentMethodInfo = info
        }
    }
}

</script>

<style lang="scss" scope>
   #quick_search{
      
    input, select,   .select2-selection--single  { 
        border:none !important; height: 65px !important; font-size:14px !important; text-align: left !important; 
    }

    .payment-method {
        a {
            height: 100% !important;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    
    .input-group-prepend, .input-group-text {background:none;border:none;}


        .select2-selection--single { 
            margin:0 !important;
            
            .select2-selection__rendered{
                line-height: 65px !important;
            }
        }
        .select2-selection__rendered{
            max-width: 200px;
        }
   }
</style>