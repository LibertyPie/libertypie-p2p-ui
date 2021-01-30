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
                                data-validator="validateBasicStep"
                            >
                                <div class="form-group my-5">
                                    <h5 class="mb-5">{{$t("select_offer_type")}}</h5>
                                    <div class="radio_btn_group d-flex flex-column flex-sm-row">

                                        <input type="radio" v-model="offerType" value='buy' name="offer_type" id="buy_offer">
                                        <label  for="buy_offer"  class="text-center">{{$t("buy_offer")}}</label>

                                        <input type="radio" v-model="offerType" value='sell'  name="offer_type" id="sell_offer">
                                        <label  for="sell_offer" class="text-center">{{$t("sell_offer")}}</label>
                                    </div>
                                    <p class='my-2 text-mute text-center text-lg-left'>{{offerTypeDesc}}</p>
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
                                                    <div class='text-sm'>
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
                                <div v-if="stepsFatalErrors['pricing_setup'] != null">
                                    <div class="alert alert-danger text-center">
                                        {{stepsFatalErrors['pricing_setup']}}
                                    </div>
                                </div>
                                <div v-else>

                                    <div class="form-group my-5">
                                        <h5 class="mb-5">{{$t("pricing_mode")}}</h5>
                                        <div class="radio_btn_group  d-flex flex-column flex-sm-row">
                                            
                                            <input type="radio" v-model="offerPricingMode" value='market'  name="offer_pricing_mode" id="offer_pricing_type_market" />
                                            <label  for="offer_pricing_type_market" class="full-width p-6 py-4 flex-fill">
                                                <div class="font-weight-bold py-2"> {{$t("market_price")}} </div>
                                                <p> {{$t( `market_${offerType}_price_desc`,[offerAssetName] )}} </p>
                                            </label>

                                            <input type="radio" v-model="offerPricingMode" value='fixed' name="offer_pricing_mode" id="offer_pricing_type_fixed" />
                                            <label  for="offer_pricing_type_fixed"   class="full-width p-6 py-4 flex-fill">
                                                <div class="font-weight-bold py-2"> {{$t("fixed_price")}} </div>
                                                <p> {{$t( `fixed_${offerType}_price_desc`, [offerAssetName] )}} </p>
                                            </label>

                                        </div>
                                   </div>

                                    <!--fixed pricing -->
                                    <div class="form-group my-5" v-if="offerPricingMode == 'fixed'">
                                        <h5 class="mb-5">{{$t("offer_price")}}</h5>
                                        
                                        <div class="d-flex align-items-center flex-column flex-md-row">

                                            <div class="form-item-button d-flex flex-row align-items-center">
                                                <input 
                                                    type="numeric" 
                                                    class="form-control text-center nobg noborder flex-grow-1" 
                                                    placeholder="0" 
                                                    style="letter-spacing:0.1em"
                                                    ref="offerFixedPriceLocal"
                                                    value="0"
                                                    @keyup="updateOfferFixedPriceUSD"
                                                />
                                                <span class="text-uppercase d-flex align-items-center px-4">
                                                    {{offerCurrency}}
                                                </span>
                                            </div>
                                            
                                            <div class="d-flex p-2 align-items-center" 
                                                v-if="(offerCurrency || '').toLowerCase() != 'usd'"
                                            >
                                                <svg-img src="/assets/images/exchange_arrow.svg"  alt="-" class="stroke-gray-600 double-arrow" />
                                            </div>
                                            
                                            <div class="form-item-button d-flex flex-row align-items-center" 
                                                v-show="(offerCurrency || '').toLowerCase() != 'usd'"
                                            >
                                                 <input 
                                                    type="numeric" 
                                                    v-model="orderFixedPrice" 
                                                    class="form-control text-center nobg noborder flex-grow-1" 
                                                    placeholder="0" 
                                                    style="letter-spacing:0.1em"
                                                    @keyup="updateOfferFixedPriceLocal"
                                                />
                                                <span class="text-uppercase d-flex align-items-center px-4">
                                                    USD
                                                </span>
                                            </div>

                                        </div>
                                            <div class="text-sm pt-2 text-danger" v-if="offerFixedPriceLocal.length != 0">
                                                {{$t("offer_fixed_price_notice",[
                                                    `${formatMoneyAsText(offerFixedPriceLocal || 0)} ${offerCurrency}`,
                                                    `${formatMoneyAsText(offerFixedPrice || 0)} USD`,
                                                    offerAssetName
                                                ])}}
                                            </div>
                                           <div v-if="offerAssetId != null" class="text-capitalize py-1 text-sm font-weight-bold">
                                                {{$t("{asset_name}_current_price",[offerAssetName])}}: {{ formatMoneyAsText(offerAssetPriceLocal) }} {{offerCurrency}}
                                            </div>
                                            <div v-if="offerAssetId != null" class="text-capitalize py-1 text-sm font-weight-bold">
                                                {{$t("final_offer_price_per_{asset}", [offerAssetName])}}: {{ formatMoneyAsText(staticOfferPrice) }} {{offerCurrency}}
                                            </div>
                                    </div>
                                    <!-- end fixed pricing -->

                                    <!-- dynamic /market pricing -->
                                    <div class="form-group my-5" v-else>
                                        <h5 class="mb-5">{{$t("profit_margin")}}</h5>
                                        <div class="mb-3 form-item-button d-flex flex-row justify-content-center align-items-center">
                                            <div>
                                                <a  href="#" class="noborder text-gray-500 nobg px-4" @click.prevent="computeProfitMarginToggle('subtract')">
                                                   <svg-img src="/assets/images/minus-solid.svg" alt="-" class="fill-gray-500" />
                                                </a>
                                            </div>

                                            <div class="flex-grow-1">
                                                <input 
                                                    type="numeric" 
                                                    v-model="profitMarginPercent" 
                                                    class="form-control text-center nobg noborder" 
                                                    placeholder="0" 
                                                    style="letter-spacing:0.1em"
                                                />
                                            </div>
                                            <div class="px-4">
                                                %
                                            </div>
                                            <div>
                                                <a href="#" 
                                                   class="noborder text-gray-500 nobg px-4" @click.prevent="computeProfitMarginToggle('add')">
                                                    <svg-img src="/assets/images/plus-solid.svg" alt="+" class="fill-gray-500" />
                                                </a>
                                            </div>    
                                        </div>
                                        <p>
                                            <div class="text-sm">{{$t("profit_margin_desc")}}</div>
                                            <div class="font-weight-bold text-sm">
                                                <div v-if="offerAssetId != null" class="text-capitalize py-1">
                                                    {{$t("{asset_name}_current_price",[offerAssetName])}}: {{formatMoneyAsText(offerAssetPriceLocal)}} {{offerCurrency}} 
                                                    &nbsp;(<span v-if="offerCurrencyRate != null">{{formatMoneyAsText(offerAssetPriceFeed)}} USD</span>)
                                                </div>
                                                <div v-if="offerAssetId != null" class="text-capitalize py-1">
                                                    {{$t("profit_margin_per_{asset}", [offerAssetName])}}: {{ formatMoneyAsText(profitMarginAmountLocal) }} {{offerCurrency}}
                                                    &nbsp;(<span v-if="offerCurrencyRate != null">{{formatMoneyAsText(profitMarginAmount)}} USD</span>)
                                                </div>
                                                <div v-if="offerAssetId != null" class="text-capitalize py-1">
                                                    {{$t("final_offer_price_per_{asset}", [offerAssetName])}}: {{ formatMoneyAsText(offerPriceWithProfitMarginLocal) }} {{offerCurrency}}
                                                     &nbsp;(<span v-if="offerCurrencyRate != null && offerCurrency != 'USD'">{{formatMoneyAsText(offerPriceWithProfitMargin)}} USD</span>)
                                                </div>
                                            </div>
                                        </p>
                                    </div>

                                    <!-- Trade Security Deposit -->
                                    <div class="form-group my-5 mb-8">
                                        <h5 class="mb-5">{{$t("security_deposit")}}</h5>
                                        <div class="custom-control custom-checkbox mb-3">
                                            <input  v-model="securityDeposit" class="custom-control-input" value="1" id="security_deposit" type="checkbox" />
                                            <label class="custom-control-label" for="security_deposit">
                                                <div>{{$t("enable")}}</div>
                                                <p class="text-sm">{{$t("security_deposit_desc")}}</p>
                                            </label>
                                        </div>
                                        <div class="my-2" v-show="securityDeposit == '1'">
                                            <div class="mb-2">{{$t("security_deposit_rate")}}</div>
                                         
                                            <div ref="securityDepositRateSlide"></div>
                                           
                                            <div class="text-sm d-flex flex-row justify-content-between">
                                                <span v-for="(v,i) in [...Array(10).keys()]" :key="i">
                                                    {{$t(v+1) + '%'}}
                                                </span>
                                            </div>
                                            <div class="text-sm my-3">
                                                {{$t("security_deposit_rate_info",[
                                                    securityDepositRate,
                                                    offerAssetName
                                               ])}}
                                            </div>
                                        </div>
                                    </div>

                                    <!-- order limit -->
                                    <div class="form-group my-5">
                                        <h5 class="mb-5">{{$t("offer_trade_limits")}}</h5>
                                        
                                        <div class="d-flex align-items-center justify-content-center flex-column flex-md-row">

                                            <div class="pb-4 full-width">
                                                <div class="mb-2">{{$t("minimum_trade_limit")}}</div>
                                                <div class="form-item-button d-flex flex-row align-items-center">
                                                    <input 
                                                        type="numeric" 
                                                        class="form-control text-center nobg noborder flex-grow-1" 
                                                        :placeholder="$t('amount')" 
                                                        style="letter-spacing:0.1em"
                                                        v-model="minTradeLimitLocal"
                                                        @keyup="computeTradeLimitUSD('min')"
                                                    />
                                                    <span class="text-uppercase d-flex align-items-center px-4">
                                                        {{offerCurrency}}
                                                    </span>
                                                </div>
                                                <div class="text-sm  py-2">
                                                  {{minTradeLimit || 0}} USD
                                                </div>
                                            </div>
                                            
                                            <div class="align-items-center d-none d-md-flex">
                                                &nbsp;
                                            </div>
                                            
                                            <div  class="pb-4 full-width">
                                                <div class="mb-2">{{$t("maximum_trade_limit")}}</div>
                                                <div class="form-item-button d-flex flex-row align-items-center">
                                                    <input 
                                                        type="numeric" 
                                                        v-model="maxTradeLimitLocal" 
                                                        class="form-control text-center nobg noborder flex-grow-1" 
                                                        :placeholder="$t('amount')" 
                                                        style="letter-spacing:0.1em"
                                                        @keyup="computeTradeLimitUSD('max')"
                                                    />
                                                    <span class="text-uppercase d-flex align-items-center px-4">
                                                        {{offerCurrency}}
                                                    </span>
                                                </div>
                                                <div class="text-sm py-2">
                                                  <span v-if="maxTradeLimit != null">{{maxTradeLimit}} USD</span>
                                                  <span v-else>{{$t("uncapped_max_limit")}}</span>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="text-sm">
                                            {{$t("trade_limit_info")}}
                                        </div>
                                        <div class="alert alert-info my-2">
                                            {{$t("minimum_trade_limit_info",[
                                                `${minimumTradeLimitAmountLocal} ${offerCurrency}`,
                                                `${minimumTradeLimitAmount} USD`
                                            ])}}
                                        </div>
                                    </div>
                                    <!-- end order limit -->

                                    
                                </div> <!-- end if no error -->
                            </div>
                            <!-- End Pricing Setup -->


                            <!-- Final Setup -->
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
                            
                            <div class="p-1 md-and-down-100pw flex-grow-1 full-width">
                                <button 
                                    class="btn btn-info btn-block md-and-down-100pw full-width text-truncate" 
                                    @click.prevent="goToPrevOrNextStep('previous')"
                                    :disabled="isPrevSetupDisabled"
                                    :readonly="isPrevSetupDisabled"
                                >
                                    {{$t("previous_set")}}
                                </button>
                            </div>
                            <div class="p-1 md-and-down-100pw flex-grow-1 full-width">
                                <button 
                                    class="btn btn-success btn-block full-width text-truncate" 
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
import ChainLink from '../../classes/ChainLink'
import CurrencyCore from '../../classes/CurrencyCore'
import rangesliderJs from 'rangeslider-js'
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';


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
            offerAssetName: "",

            paymentTypesData: [],
            offerPaymentMethodInfo: null,
            offerTerritoryInfo: null,
            userCountry: "",

            isPTModalVisible: false,
            currentStepId: "",
            previousStepId: "",
            isPrevSetupDisabled: false,
            isNextSetupDisabled: false,
            offerAssetPriceFeed: null,
            offerAssetPriceLocal: null,
            offerCurrency: null,
            offerCurrencyRate: null,
            
            stepsFatalErrors: {
                "basic_setup": null, 
                "pricing_setup": null,
                "final_setup": null
            },

            //pricing setup vars 
        
            offerPricingMode: "market",

            profitMarginPercent: 1,
            profitMarginAmount: 0,
            profitMarginAmountLocal: 0,
            offerPriceWithProfitMargin: 0,
            offerPriceWithProfitMarginLocal: 0,

            offerFixedPrice: 0,
            offerFixedPriceLocal: 0,

            minTradeLimit: 5,
            minTradeLimitLocal: null,
            maxTradeLimit: null,
            maxTradeLimitLocal: null,

            minimumTradeLimitAmount: 5,
            minimumTradeLimitAmountLocal: 0,

            //security deposit
            securityDeposit: 0, //0 means disabled
            securityDepositRate: 5
        }
    },
    watch: {
        offerType(){
            this.offerTypeDesc = this.$t(`${this.offerType}_offer_desc`)
        },

        //if the offer asset id changes 
        // reset the price feed
        offerAssetId() {
            this.offerAssetName = this.cryptoAssetsData[this.offerAssetId].originalName;
            this.offerAssetPriceFeed = null;
            this.fetchAssetPrice()
        },

        offerTerritoryInfo(){
            this.fetchAssetPrice()
        },

        profitMarginPercent(){ this.computeProfitMarginMath() },

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

        this.fetchAssetPrice();
    },

    mounted(){
        //set default offer type to buy 
        this.offerType = "buy";

        this.goToStepById("basic_setup")

        let slider = this.$refs.securityDepositRateSlide
        
        noUiSlider.create(slider,{
               start: [this.securityDepositRate],
                step: 1,
                range: {
                    'min': [1],
                    'max': [10]
                }
        })
        
        slider.noUiSlider.on("slide", (value)=> this.securityDepositRate = value[0]);
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

            this.isNextSetupDisabled = false;
            this.isPrevSetupDisabled = false;

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

                //lets check if current has error, it it does,
                //avoid going to next
                if(this.stepsFatalErrors[prevOrNextStepId] != null){
                    this.isNextSetupDisabled = true;
                }
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
         * validatePricing Setup
         */
        async validatePricingSetup() {

            if(["fixed","market"].includes(this.offerPricingMode)){
                this.errorNotif(this.$t("unknown_offer_pricing_mode"))
                return false;
            }

            if(this.offerPricingMode == "market" && typeof this.profitMarginPercent !== 'number' ){
                this.errorNotif(this.$t("profit_margin_required"))
                return false;
            }

            //if fixed pricing

            if(this.offerPricingMode == "fixed" && typeof this.offerFixedPrice !== 'number' ){
                this.errorNotif(this.$t("offer_fixed_price_required"))
                return false;
            }

            if(parseFloat(this.offerFixedPrice) <= 0){
                this.errorNotif(this.$t("offer_fixed_price_cannot_be_zero"))
                return false;
            }

            if(!this.minTradeLimit || parseFloat(this.minTradeLimit) == 0){
                this.errorNotif(this.$t("min_trade_limit_error",[
                    `${5 * this.offerCurrencyRate} ${this.offerCurrency}`,
                    `5 USD`
                ]))

                return false;
            }

            //if security deposit is enabled lets validate it 
            if(this.securityDeposit == '1'){

                let securityDepositRate = parseInt(this.securityDeposit)

                //lets get security depoist rate
                if(securityDepositRate <= 0 || securityDepositRate > 10){
                    this.errorNotif(this.$t("security_deposit_rate_error"))
                    return false; 
                }
            }
        }, //end validate

        /**
         * fetch selected asset price feed
         */
        async fetchAssetPrice(){
           
            let chainlink = new ChainLink();
            let priceFeedStatus = await chainlink.getPriceFeed("btc_usd")
            
            if(priceFeedStatus.isError()){
                this.stepsFatalErrors["pricing_setup"] = priceFeedStatus.getMessage()
                return priceFeedStatus;
            }
            
            //price 
            this.offerAssetPriceFeed = priceFeedStatus.getData()

           this.computeOfferAssetLocalPrice()

            return priceFeedStatus;
        },

        //lets get localized price of assets
        async computeOfferAssetLocalPrice(){
            
            if(this.offerTerritoryInfo == null) return;

            let offerCountryCode = this.offerTerritoryInfo.code;

            if(this.offerAssetPriceFeed == null){
               let priceFeedStatus = await this.fetchAssetPrice(false)

               if(priceFeedStatus.isError()) return;
            }

            this.offerCurrency = await CurrencyCore.getCurrencyByCountry(this.offerTerritoryInfo.code)

            //lets now get rate by country info
            let currencyRateStatus =  await CurrencyCore.getRate(
                this.offerCurrency
            )

            if(currencyRateStatus.isError()){
                this.stepsFatalErrors["pricing_setup"] = currencyRateStatus.getMessage()
                return false;
            }

            this.offerCurrencyRate = currencyRateStatus.getData()
            
            this.offerAssetPriceLocal = (this.offerAssetPriceFeed * this.offerCurrencyRate)

            this.minimumTradeLimitAmountLocal = (this.offerCurrencyRate * this.minimumTradeLimitAmount)

            this.minTradeLimitLocal = (this.minTradeLimit * this.offerCurrencyRate)
            
            this.computeProfitMarginMath()
        },

        // compute price margin
        computeProfitMarginToggle(mode){

            let pm = parseFloat(this.profitMarginPercent.toString())
            
            if(mode=='add'){ this.profitMarginPercent = (pm + 0.1).toFixed(1); } 
            else { this.profitMarginPercent = (pm - 0.1).toFixed(1); }

        },

        computeProfitMarginMath(){

            this.profitMarginAmount = this.formatMoney((this.profitMarginPercent / 100) * this.offerAssetPriceFeed);
            
            this.profitMarginAmountLocal = ( this.profitMarginAmount * this.offerCurrencyRate)

            this.offerPriceWithProfitMargin = this.formatMoney(this.offerAssetPriceFeed + parseFloat(this.profitMarginAmount));
            
            this.offerPriceWithProfitMarginLocal =  this.formatMoney( this.offerPriceWithProfitMargin * this.offerCurrencyRate)

        },

        /**
         * update static offer price usd 
         */
        updateOfferFixedPriceUSD(e){
            let value = parseFloat(e.target.value) || 0;
            this.offerFixedPriceLocal = value;
            this.offerFixedPrice = this.formatMoney( value / parseFloat(this.offerCurrencyRate) )
        },

        //calculate the local price  for static offer price
        updateOfferFixedPriceLocal(e){
            let dom = this.$refs.staticLocalPriceInput;
            let priceLocal = this.formatMoney(parseFloat(this.offerFixedPrice || 0) * parseFloat(this.offerCurrencyRate));
            this.offerFixedPriceLocal = priceLocal;
            dom.value = priceLocal
        },

        /**
         * orderLimit
         */
        computeTradeLimitUSD(limitType){

            if(this.offerCurrency.toLowerCase() == "usd") return;

            if(limitType == 'min'){ 
                this.minTradeLimit = this.formatMoney( this.minTradeLimitLocal / parseFloat(this.offerCurrencyRate) ) 
            } else { 
                this.maxTradeLimit = this.formatMoney( this.maxTradeLimitLocal / parseFloat(this.offerCurrencyRate) ) 
            }
        }//end 

    }
}
</script>
