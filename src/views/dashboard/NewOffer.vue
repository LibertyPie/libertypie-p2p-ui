<template>
     <DashboardLayout 
        :breadcrumb="breadcrumbData"
        :title="$t('new_offer')"
        :subTitle="$t('new_offer_subtitle')"
    >
        <div class="card shadow mb-10">
            <div class="card-body">
                <div class="d-flex flex-row justify-content-between">
                    <div>
                        <h1 class="card-title py-0 my-0">{{$t("new_offer")}}</h1>
                    </div>
                </div>

                <div class="row">

                    <div class="col-12 col-md-12 col-lg-8">
                        <div class="mb-3 step_wizard my-10" id="pills-tab" role="tablist">
                            
                            <a class="step active" 
                                id="basic_setup_tab" 
                                data-toggle="pill"
                                href="#basic_setup" 
                                role="tab" 
                                aria-controls="pills_basic_setup" 
                                aria-selected="true"
                            >
                                <div class="inner">
                                    <span class="dot"></span>
                                    <span class="text">{{$t("basic_setup")}}</span>
                                </div>
                            </a>
                
                            <a class="step" 
                                id="pricing_setup_tab" 
                                data-toggle="pill" 
                                href="#pricing_setup" 
                                role="tab" 
                                aria-controls="pills_pricing_setup" 
                                aria-selected="false"
                            >
                                <div class="inner">
                                    <span class="dot"></span>
                                    <span class="text">{{$t("pricing_setup")}}</span>
                                </div>
                            </a>

                            <a class="step" 
                                id="final_setup_tab" 
                                data-toggle="pill" 
                                href="#final_setup" 
                                role="tab" 
                                aria-controls="pills_final_setup" 
                                aria-selected="false"
                            >
                                <div class="inner">
                                    <span class="dot"></span>
                                    <span class="text">{{$t("final_setup")}}</span>
                                </div>
                            </a>

                        </div>

                        <div class="tab-content" id="pills-tabContent">

                            <!-- Basic Setup -->
                            <div class="tab-pane fade show active" id="basic_setup" role="tabpanel" aria-labelledby="pills_basic_setup">
                                <div class="form-group">
                                    <h5>{{$t("select_offer_type")}}</h5>
                                    <div class="my-5">
                                        <div class="radio_btn_group">

                                            <input type="radio" v-model="offerType" value='buy' name="offer_type" id="buy_offer">
                                            <label  for="buy_offer"  class="font-weight-bold">{{$t("buy_offer")}}</label>

                                            <input type="radio" v-model="offerType" value='sell'  name="offer_type" id="sell_offer">
                                            <label  for="sell_offer" class="font-weight-bold">{{$t("sell_offer")}}</label>

                                            <p class='my-2 text-mute'>{{offerTypeInfo}}</p>

                                        </div>
                                    </div>
                                 </div>
                                 <div class="form-group">
                                    <h5 class='text-capitalize'>{{$t("_i_want_to_{offer_type}",[this.offerType])}}</h5>
                                    <div class="my-5">
                                        <div v-for="(item,index) in cryptoAssetsData" :key="index"
                                            class="custom-control custom-radio my-5"
                                        >
                                            <input 
                                                type="radio" 
                                                :id="'offer_asset_'+index" 
                                                name="offer_asset" 
                                                class="custom-control-input"
                                                :checked="(index == 0)"
                                            />
                                            <label class="custom-control-label" :for="'offer_asset_'+index">
                                                <div class="flex flex-column justify-content-center">
                                                    <div class="font-weight-bold font-size-16">
                                                        <span class="pr-2">{{item.originalSymbol}}</span>
                                                        <span class="text-gray-600">{{item.originalName}}</span>
                                                    </div>
                                                    <div class='text-small'>
                                                        {{$t("_offer_asset_info",[$t(offerType).toLowerCase(),item.originalName])}}
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>    
                                </div>

                                <div class="form-group">
                                    <h5 class='text-capitalize'>{{$t("payment_method")}}</h5>
                                    <div class="my-5">
                                        <div class="flex flex-column flex-md-row">
                                            <a  @click.prevent="isPTModalVisible=true"
                                                class="btn btn-outline-primary payment-type-wrapper font-weight-bold px-20 text-truncate"
                                            >
                                                {{
                                                    (offerPaymentMethodInfo == null)     ? 
                                                        $t('select_payment_method') :
                                                        offerPaymentMethodInfo.name
                                                }}
                                            </a>

                                            <PaymentTypesModal 
                                                :visible="isPTModalVisible"
                                                @on-hide="isPTModalVisible=false"
                                                @on-show="isPTModalVisible=true"
                                                @on-select="handleOnPaymenMethodSelect"
                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <!-- Basic Setup Tab Content Ends -->

                            <!-- Pricing Setup Tab -->
                            <div class="tab-pane fade" id="pricing_setup" role="tabpanel" aria-labelledby="pills_pricing_setup">
                                Two ---
                            </div>
                            <!-- End Pricing Setup -->

                            <div class="tab-pane fade" id="confirmation" role="tabpanel" aria-labelledby="confirmation_tab">
                                Three ---
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-12 col-lg-4">
                        <div></div>
                    </div>
                </div>
              
            </div>
        </div>


     </DashboardLayout>
</template>

<script>
import AssetSelect from '../../components/partials/AssetSelect.vue';
import DashboardLayout from '../../layouts/DashboardLayout.vue';
import PaymentTypesModal from "../../components/partials/modals/PaymentTypes.vue"

export default {
    name: "new_offer",
    components: {DashboardLayout, AssetSelect, PaymentTypesModal},
    data(){
      
       return {
            breadcrumbData: [],
            offerType: '',
            offerTypeInfo: '',
            cryptoAssetsData: [],
            offerPaymentMethodInfo: null,
            isPTModalVisible: false
        }
    },
    watch: {
        offerType(){
            this.offerTypeInfo = this.$t(`${this.offerType}_offer_desc`)
        }
    },

    async beforeMount(){
        this.breadcrumbData = [
            {
                title: this.$t("offers"),
                name:  "dashboard_offers",
                icon:  "offer.svg"
            },
            {
                title: this.$t("new_offer"),
                name:  "new_offer"
            }
        ];

        // fetch assets 
        this.cryptoAssetsData =  (await this.$libertypie.fetchAssets()).getData() || []
    },

    mounted(){
        //set default offer type to buy 
        this.offerType = "buy";
    },

    methods: {

        async handleOnPaymenMethodSelect(info){
            this.offerPaymentMethodInfo = info
        }

    }
}
</script>

<style lang="scss">
    .payment-type-wrapper {
        height: 60px;
        line-height: 30px;
        border-width: 2px;
        border-radius: 8px;
        width: 380px;
        max-width: 98%;

        &:hover{
            background: none;
        }
    }
</style>