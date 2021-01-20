<template>
    <DashboardLayout 
        :breadcrumb="breadcrumbData"
        :title="$t('offers')"
        :subTitle="$t('offer_subtitle')"
    >
     
    </DashboardLayout>
</template>
 
<script>

import DashboardLayout from '../../layouts/DashboardLayout.vue'

export default {
    name: "offers",
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
                url:  "#",
                icon: "offer.svg"
            }
        ];
    }
}
</script>

<style>

</style>