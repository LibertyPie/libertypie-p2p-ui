<template>
    <div class="xbreadcrumb shadow-primary" aria-label="breadcrumb" role="navigation">
        <div
            v-for="(item,index) in breadcrumbData" 
            :key="index"
            :class="(index == breadcrumbData.length -1) ? 'current': ''"
        >
            <router-link 
                :to="(item.hasOwnProperty('path') ? 
                    {path: item.path} : 
                    {name: item.name}
                )"
            >   
                <span class="icon" v-if='item.icon.length > 0'> 
                    <svg-img :src="`/assets/images/${item.icon}`"   />
                </span>
                <span class="text">{{item.title}}</span>
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