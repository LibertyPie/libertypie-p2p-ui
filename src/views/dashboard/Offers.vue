<template>
    <DashboardLayout 
        :breadcrumb="breadcrumbData"
    >
        <div>      
            <div class="card shadow my-0">
                <div class="card-body">
                    <div class="d-flex flex-row justify-content-between">
                        <div>
                            <h2 class="card-title py-0 my-0">{{$t("offers")}}</h2>
                            <p class="subtitle muted">{{$t("offer_subtitle")}}</p>
                        </div>
                        <div>
                            <router-link 
                                :to="{name: 'new_offer'}" 
                                class="btn btn-success float-right"
                            >
                                {{$t("new_offer")}}
                            </router-link>
                        </div>
                    </div>   
                </div>
            </div>
        </div>
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
                path:  "#",
                icon: "offer.svg"
            }
        ];
    }
}
</script>

<style>

</style>