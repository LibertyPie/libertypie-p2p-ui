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
                        <h2 class="card-title py-0 my-0">{{$t("new_offer")}}</h2>
                    </div>
                </div>

                <div class="mb-3 step_wizard my-10" id="pills-tab" role="tablist">
                    
                    <a class="step active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                       <div class="inner">
                            <span class="dot"></span>
                            <span class="text">Hello</span>
                       </div>
                    </a>
        
                    <a class="step" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
                       <div class="inner">
                            <span class="dot"></span>
                            <span class="text">Hello</span>
                       </div>
                    </a>

                    <a class="step" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">
                        <div class="inner">
                            <span class="dot"></span>
                        </div>
                    </a>

                </div>

                 <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        One ---
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        Two ---
                    </div>
                    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                        Three ---
                    </div>
                </div>
              
            </div>
        </div>


     </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../layouts/DashboardLayout.vue';
import "smartwizard";
import "smartwizard/dist/css/smart_wizard_all.min.css";

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