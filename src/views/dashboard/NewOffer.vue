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
                        <h2 class="card-title py-0 my-0">{{$t("create_a_new_offer")}}</h2>
                    </div>
                </div>

                <div class="d-flex flex-row">
                    <div class="flex-grow-1">
                        <div id="smartwizard">
                            <ul class="nav">
                                <li class="nav-item">
                                    <a class="nav-link" href="#step-1">
                                        Step 1
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#step-2">
                                        Step 2
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#step-3">
                                        Step 3
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#step-4">
                                        Step 4
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div> 

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

        $('#smartwizard').smartWizard({
            theme: 'default'
        });
    }
}
</script>

<style>

</style>