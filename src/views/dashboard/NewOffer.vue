<template>
     <DashboardLayout 
        :breadcrumb="breadcrumbData"
        :title="$t('new_offer')"
        :subTitle="$t('new_offer_subtitle')"
    >
        <div class="card shadow my-0">
            <div class="card-body">
                <div class="d-flex flex-row justify-content-between">
                    <div>
                        <h1 class="card-title py-0 my-0">{{$t("new_offer")}}</h1>
                    </div>
                </div>

                <div class="d-flex flex-row">

                    <div class="flex-grow-1">
                        <div class="mb-3 step_wizard my-10" id="pills-tab" role="tablist">
                            
                            <a class="step completed" 
                                id="asset_setup_tab" 
                                data-toggle="pill"
                                href="#asset_setup" 
                                role="tab" 
                                aria-controls="pills_asset_setup" 
                                aria-selected="true"
                            >
                                <div class="inner">
                                    <span class="dot"></span>
                                    <span class="text">{{$t("asset_setup")}}</span>
                                </div>
                            </a>
                
                            <a class="step active" 
                                id="payment_method_tab" 
                                data-toggle="pill" 
                                href="#payment_method_setup" 
                                role="tab" 
                                aria-controls="pills_payment_method_setup" 
                                aria-selected="false"
                            >
                                <div class="inner">
                                    <span class="dot"></span>
                                    <span class="text">{{$t("payment_method")}}</span>
                                </div>
                            </a>

                            <a class="step" 
                                id="confirmation_tab" 
                                data-toggle="pill" 
                                href="#confirmation" 
                                role="tab" 
                                aria-controls="pills_confirmation" 
                                aria-selected="false"
                            >
                                <div class="inner">
                                    <span class="dot"></span>
                                    <span class="text">{{$t("confirm")}}</span>
                                </div>
                            </a>

                        </div>

                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="asset_setup" role="tabpanel" aria-labelledby="pills_asset_setup">
                                <div class="form-group">
                                    <h5>{{$t("select_offer_type")}}</h5>
                                    <div class="my-5">
                                        <div class="radio_btn_group">

                                            <input type="radio" name="offer_type" id="buy_offer">
                                            <label  for="buy_offer">{{$t("buy_offer")}}</label>

                                            <input type="radio" name="offer_type" id="sell_offer">
                                            <label  for="sell_offer">{{$t("sell_offer")}}</label>
                                            
                                        </div>
                                    </div>
                                 </div>
                            </div>
                            <div class="tab-pane fade" id="payment_method_setup" role="tabpanel" aria-labelledby="pills_payment_method_setup">
                                Two ---
                            </div>
                            <div class="tab-pane fade" id="confirmation" role="tabpanel" aria-labelledby="confirmation_tab">
                                Three ---
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style="width:400px;"></div>
                    </div>
                </div>
              
            </div>
        </div>


     </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../layouts/DashboardLayout.vue';

export default {
    name: "new_offer",
    components: {DashboardLayout},
    data(){
        return {
            breadcrumbData: []   
        }
    },
    beforeMount(){
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
    },

    mounted(){

    }
}
</script>

<style>

</style>