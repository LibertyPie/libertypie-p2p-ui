<template>
    <div class="xbreadcrumb shadow-primary" aria-label="breadcrumb" role="navigation">
       <div>
           <router-link 
                v-for="(item,index) in breadcrumbData" 
                :key="index"
            >

           </router-link>
       </div>
    </div>
</template>

<script>
export default {
    props:{
        data: {
            type: Array,
            default: []
        }
    },
    data(){
        return {
            breadcrumbData: this.data
        }
    },

    beforeMount(){
        this.breadcrumbData.unshift({
            title: this.$t('home'),
            name: 'home',
            icon: 'home.svg'
        })
    }
}
</script>

<style>

</style>