<template>
  <div class="dashboard">
    <MainLayout>
 
      <div class="d-flex flex-row mt-5"> 
          <div>
              <Sidebar />
          </div>
          <div class="main-content flex-grow-1"> 
            <div class='d-flex flex-column flex-lg-row justify-content-center justify-content-lg-start my-5'>
              <div class="flex-grow-1 px-5 py-0">
                <h1 class="title-heading">{{title}}</h1>
                <p class="subtitle muted" v-if="subTitle.length > 0">{{subTitle}}</p>
              </div>
              <div class="flex-grow-1 flex-nowrap">
                <Breadcrumb :data="breadcrumbData" />
              </div>  
            </div>
            <slot></slot>
          </div>
      </div>
    </MainLayout>
  </div>
</template>

<script>

import MainLayout from "./MainLayout.vue"
import Sidebar from '../components/partials/Sidebar.vue';
import Breadcrumb from '../components/partials/Breadcrumb.vue';

export default {
  name: 'DashboardLayout',
  components: {MainLayout, Sidebar,Breadcrumb},
  props: {
    breadcrumb: {
      type: Array,
      default: []
    },
    title: {type: String, default: ''},
    subTitle: { type: String, default: ''}
  },
    data() {
    return {
      breadcrumbData: this.breadcrumb
    }
  },
  beforeMount(){
    this.processBreadcrumb();
  },
  methods: {
    processBreadcrumb(){
      this.breadcrumbData.unshift({
         title: this.$t("dashboard"),
         name: "dashboard",
         icon: "dashboard.svg"
      })    
    }
  }
}
</script>
