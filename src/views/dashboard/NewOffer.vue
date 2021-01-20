<template>
     <DashboardLayout 
        :breadcrumb="breadcrumbData"
        :title="$t('new_offer')"
        :subTitle="$t('new_offer_subtitle')"
    >

     </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../layouts/DashboardLayout.vue'

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
    }
}
</script>

<style>

</style>