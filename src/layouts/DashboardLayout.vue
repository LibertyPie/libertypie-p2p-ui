<template>
  <div class="dashboard">
    <MainLayout>
      
      <div class="my-5 mx-2 flex flex-contents-center align-items-center">
        <Breadcrumb :data="breadcrumbData" />
      </div>
      <div class="d-flex flex-row mt-5"> 
          <div>
              <Sidebar />
          </div>
          <div class="main-content flex-grow-1 mr-4"> 
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
