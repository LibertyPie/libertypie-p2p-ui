<template>
     <DashboardLayout 
        :breadcrumb="breadcrumbData"
        :title="$t('new_offer')"
        :subTitle="$t('new_offer_subtitle')"
    >
        <div class="card shadow mb-10" id="new-offer">
            <div class="card-body">
                <div class="d-flex flex-row justify-content-between">
                    <div>
                        <h1 class="card-title py-0 my-0">{{$t("new_offer")}}</h1>
                    </div>
                </div>

                <div class="row">

                    <div class="col-12 col-md-12 col-lg-8">

                        <div class="mb-3 step_wizard my-10">
                            
                            <a class="step active" 
                                id="basic_setup_tab" 
                                data-content="basic_setup" 
                            >
                                <div class="inner">
                                    <span class="dot"></span>
                                    <span class="text">{{$t("basic_setup")}}</span>
                                     <span class="text_alt">{{$t("1")}}</span>
                                </div>
                            </a>
                
                            <a class="step" 
                                id="pricing_setup_tab" 
                                data-content="pricing_setup" 
                                disabled
                            >
                                <div class="inner">
                                    <span class="dot"></span>
                                    <span class="text">{{$t("pricing_setup")}}</span>
                                    <span class="text_alt">{{$t("2")}}</span>
                                </div>
                            </a>

                            <a class="step" 
                                id="final_setup_tab" 
                                data-content="final_setup"
                                disabled
                            >
                                <div class="inner">
                                    <span class="dot"></span>
                                    <span class="text">{{$t("final_setup")}}</span>
                                     <span class="text_alt">{{$t("3")}}</span>
                                </div>
                            </a>

                        </div>

                        <div  id="step_wizard_contents">

                            <!-- Basic Setup -->
                            <div 
                                class="step_content" 
                                id="basic_setup"
                                data-next-step="pricing_setup"
                            >
                                <div class="form-group my-5">
                                       <h5 class="mb-5">{{$t("select_offer_type")}}</h5>
                                    <div class="radio_btn_group d-flex flex-column flex-sm-row">

                                        <input type="radio" v-model="offerType" value='buy' name="offer_type" id="buy_offer">
                                        <label  for="buy_offer"  class="text-center">{{$t("buy_offer")}}</label>

                                        <input type="radio" v-model="offerType" value='sell'  name="offer_type" id="sell_offer">
                                        <label  for="sell_offer" class="text-center">{{$t("sell_offer")}}</label>
                                    </div>
                                    <p class='my-2 text-mute'>{{offerTypeDesc}}</p>
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
                                                v-model="offerAssetId"
                                                :value="index"
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
                                        <a  href="#"
                                            @click.prevent="isPTModalVisible=true"
                                            :class="[
                                                'form-item-button',
                                                `${(offerPaymentMethodInfo == null) ? '': 'selected'}`
                                            ]"
                                        >
                                            {{
                                                (offerPaymentMethodInfo == null)     ? 
                                                    $t('select_one') :
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
                                <div class="form-group">
                                    <h5 class='text-capitalize'>{{$t("territory")}}</h5>
                                    <div class="my-5">
                                        <span 
                                            :class="[
                                                'btn m-0 p-0',
                                                'form-item-button',
                                                `${(offerTerritoryInfo == null) ? '': 'selected'}`
                                            ]"
                                        >
                                                <CountrySelect 
                                                    cssClass="country_select" 
                                                    :placeholder="$t('select_one')"
                                                    :selected="userCountry || ''"
                                                    :key="userCountry"
                                                    :showWorldwide="false"
                                                    @change="(data) => offerTerritoryInfo = data"
                                                />
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <!-- Basic Setup Tab Content Ends -->

                            <!-- Pricing Setup Tab -->
                            <div class="step_content" 
                              id="pricing_setup"
                              data-next-step="final_setup"
                              data-prev-step="basic_setup"
                            >
                                Two ---
                            </div>
                            <!-- End Pricing Setup -->

                            <div 
                                class="step_content" 
                                id="final_setup"
                                data-prev-step="pricing_setup"
                            >
                                Three ---
                            </div>

                        </div> <!-- end step_contents -->

                    </div> <!--end row -->

                    <div class="col-12 col-md-12 col-lg-4 d-flex flex-row justify-content-center">
                        <div class="vdivider d-none d-lg-inline-block">
                            <div class="inner"></div>
                        </div>
                        <div class="flex-grow-1 d-flex pl-4 align-items-center justify-content-center flex-sm-column-reverse flex-md-row">
                            
                            <div class="p-1">
                                <button 
                                    class="btn btn-info btn-block" 
                                    @click.prevent="goToPrevOrNextStep('previous')"
                                    :disabled="isPrevSetupDisabled"
                                    :readonly="isPrevSetupDisabled"
                                >
                                    {{$t("previous_set")}}
                                </button>
                            </div>
                            <div class="p-1">
                                <button 
                                    class="btn btn-success btn-block" 
                                    @click.prevent="goToPrevOrNextStep('next')"
                                    :disabled="isNextSetupDisabled"
                                    :readonly="isNextSetupDisabled"
                                >
                                    {{$t("next_step")}}
                                </button>
                            </div>
                        </div>
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
import CountrySelect from '../../components/partials/CountrySelect.vue';

export default {
    name: "new_offer",
    components: {DashboardLayout, AssetSelect, PaymentTypesModal, CountrySelect},
    data(){
      
       return {
            breadcrumbData: [],
            offerType: '',
            offerTypeDesc: '',
            cryptoAssetsData: [],
            offerAssetId: null,
            paymentTypesData: [],
            offerPaymentMethodInfo: null,
            offerTerritoryInfo: null,
            userCountry: "",
            offerAssetPriceFeed: null,
            isPTModalVisible: false,
            currentStepId: "",
            previousStepId: "",
            isPrevSetupDisabled: false,
            isNextSetupDisabled: false
        }
    },
    watch: {
        offerType(){
            this.offerTypeDesc = this.$t(`${this.offerType}_offer_desc`)
        },

        //if the offer asset id changes 
        // reset the price feed
        offerAssetId() {
            this.offerAssetPriceFeed = null;
            this.fetchAssetPrice()
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

        this.offerAssetId = Object.keys(this.cryptoAssetsData)[0];

        //fetch user current location
        this.$userCountry().then(c => this.userCountry = c);

        await this.fetchAssetPrice();
    },

    mounted(){
        //set default offer type to buy 
        this.offerType = "buy";

        this.goToStepById("basic_setup")
    },

    methods: {

        async handleOnPaymenMethodSelect(info){
            this.offerPaymentMethodInfo = info
        },      

        goToStepById(id){
            $("#step_wizard_contents")
                .find('.step_content')
                .removeClass("active")
            $("#"+id).addClass("active")

            this.currentStepId = id;
        },

        //go to next step
        goToPrevOrNextStep(type){

            let curStepEl = $("#"+this.currentStepId);
            let curStepTabEl = $("#"+this.currentStepId+"_tab")

            //lets get current step
            let nextStep = curStepEl.data("nextStep") || null;
            let prevStep = curStepEl.data("prevStep") || null;

            let prevOrNextStepId = null;

            if(type == "previous"){

                if(prevStep == null){
                    return false;
                }

                 prevOrNextStepId = prevStep;

                 curStepTabEl.removeClass("active")
                             .removeClass("completed")

            } else {

                if(this.currentStepId == "basic_setup"){
                    if(!this.validateBasicStep()){
                        return false;
                    }
                }

                $("#"+nextStep+"_tab").addClass("active")

                if(nextStep == null){
                    return false;
                }

                //lets check if the next step has no next step
                //then mark it as completed to fill the border
                if(($("#"+nextStep).data("nextStep")|| null) == null){
                    $("#"+nextStep+"_tab").addClass("completed")
                }

                curStepTabEl
                    .removeClass("active")
                    .addClass("completed")

                prevOrNextStepId = nextStep;
            }

            let stepContentDoms = $("#step_wizard_contents").find('.step_content')

            stepContentDoms.removeClass('active')
            
            this.currentStepId = prevOrNextStepId

            $("#"+this.currentStepId).addClass("active")
        },//end 


        async validateBasicStep(){

            //validate offerType 
            if(!["buy","sell"].includes(this.offerType)){
                this.errorNotif(this.$t("unknown_offer_type"))
                return false;
            }

            //next validation
            if(this.offerAssetId == null){
                this.errorNotif(this.$t("offer_asset_required"))
                return false;
            }

            if(!this.cryptoAssetsData.hasOwnProperty(this.offerAssetId)){
                 this.errorNotif(this.$t("unknown_crypto_asset"))
                 return false;
            }

            if(this.offerPaymentMethodInfo == null){
                this.errorNotif(this.$t("payment_method_required"))
                return false;
            }

            let validatePaymentMethodStatus = await this.validatePaymentType(this.paymentTypesData.id);

            if(validatePaymentMethodStatus.isError()){
                this.errorNotif(validatePaymentMethodStatus.getMessage())
                return false;
            }

            //finally lets validate the country
            if(this.offerTerritoryInfo == null){
                this.errorNotif(this.$t("offer_territory_required"))
                return false;                
            }

            let countryCode = this.offerTerritoryInfo.code || null;

            if(!/[a-z]+/i.test(countryCode) || countryCode.length != 2){
                this.errorNotif(this.$t("unknown_territory"))
                return false;                  
            }

            return true;
        },

        /**
         * fetch selected asset price feed
         */
        async fetchAssetPrice(){
            try {
                let priceFeedData = await this.$libertypie.getPriceFeed("btc_usd")
            } catch (e){
                console.log(e)
            }
        }
    }
}
</script>
