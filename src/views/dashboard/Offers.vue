<template>
    <DashboardLayout 
        :breadcrumb="breadcrumbData"
        :title="$t('offers')"
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
    mounted(){
        this.breadcrumbData = [
            {
                title: this.$t("offers"),
                url:  "#",
                icon: "offers.svg"
            }
        ];
    }
}
</script>

<style>

</style>