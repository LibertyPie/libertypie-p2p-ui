<template>
   <div id="quick_search" class="row"> 
        <div  class="col-12 col-md-10 col-xl-6 col-xl-4">
            <div class="px-15 py-10">
                <div class="title_wrapper">  
                    <h1 class="text-white-80">{{ $t("search_offers") }}</h1>
                    <div class="text-white-60 subtitle">{{ $t("quick_search_desc") }}</div>
                </div>
                <div class="bg-white form-wrapper rounded shadow">
                    <div class="row mt-2">
                        <div class="col col-12  col-md-4 col-lg-4 vdivider">
                            <div class="input-group pr-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <img src="/assets/images/rec.svg" width="18" />
                                    </span>
                                </div>
                                <select class="form-control form-control-lg">
                                    <option value="" selected disabled class="">{{$t("asset")}}</option>
                                     <option value=""></option>
                                    <option value="btc">Bitcoin</option>
                                    <option value="eth">Ethereum</option>
                                    <option value="xmr">Monero</option>
                                    <option value="bnb">Binance Coin</option>
                                </select>
                            </div>
                        </div>
                        <div class="col col-12  col-md-4 col-lg-4 vdivider payment-method">
                            <a href="#">
                                <div class="d-flex  align-items-center">
                                    <div class="pr-5 pl-5"><img src="/assets/images/s_menu.svg" width="18" /></div>
                                    <div class="text-md pr-5 text-gray-700 text-ellipsis text">{{$t("payment_methods")}}</div>
                                </div>
                            </a>
                        </div>
                        <div class="col col-12  col-md-4 col-lg-4">
                            <div class="d-flex">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <img src="/assets/images/pin.svg" width="18" />
                                    </span>
                                </div>
                                <div class="flex-grow-1">
                                    <CountrySelect 
                                        cssClass="form-control-lg" 
                                        :placeholder="$t('location')"
                                        :defaultOptionText="$t('location')"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>

import CountrySelect from "../CountrySelect"
import LibertyPie from "../../../classes/LibertyPie"

export default {
    components: {CountrySelect},
    mounted(){
        
        let libertypie = new LibertyPie()

        libertypie.getAllPaymentTypes()
    }
}

</script>

<style lang="scss">
    #quick_search{

        background-color: #181C7E;
        padding-top:20px;
        padding-bottom: 20px;
        background-image: url("/assets/images/sb.jpg");
        background-repeat: no-repeat;
        background-position: top right;
        background-size: contain;

        a, a:hover, a:active, a:visited{ color: #3F4254 !important; text-decoration: none;}
        
        .title_wrapper{

            display: flex;

            .subtitle {
                padding-left: 10px;
                padding-top: 10px;
            }
        }

        
        input, select, .payment-method,  .select2-selection--single  { 
            border:none !important; height: 65px !important; font-size:14px !important; text-align: left !important; 
        }
        
        .select2-selection--single { 
            margin:0 !important;
            
            .select2-selection__rendered{
                 line-height: 65px !important;
            }
        }

        .input-group-prepend, .input-group-text {background:none;border:none;}

        .vdivider:after {
            background: #E3E6EF;
            width: 2px;
            position: absolute;
            top: 0;
            right: 0;
            bottom:0;
            content: "";
            margin-top: 18px;
            margin-bottom: 18px;
        }

        .payment-method { 
            line-height:60px;
            .text{
                white-space: nowrap !important;
                text-overflow: ellipsis !important;
                overflow: hidden;
            }
        }

        .select2-selection__rendered{
            max-width: 200px;
        }
    }
    
</style>