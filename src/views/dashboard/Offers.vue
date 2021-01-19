<template>
    <DashboardLayout :breadcrumb="breadcrumbData">
     
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
                
            }
        ];
    }
}
</script>

<style>

</style>