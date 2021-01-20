<template>
  <div class="dashboard">
    <MainLayout>
      <div class="d-flex flex-row"> 
          <div>
              <Sidebar />
          </div>
          <div class="main-content flex-grow-1"> 
            <div class='d-flex'>
              <div class="title flex-grow-1">{{title}}</div>
              <div class="flex-grow-1">
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
    title: {type: String, default: ''}
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
