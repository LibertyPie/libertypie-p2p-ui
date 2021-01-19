<template>
  <div class="dashboard">
    <MainLayout>
      <div class="d-flex flex-row"> 
          <div class="sidebar">
              <Sidebar />
          </div>
          <div class="main-content flex-grow-1"> 
            <div class='d-flex'>
              <div class="title flex-grow-1">{{title}}</div>
              <div class="flex-grow-1" v-if="breadcrumb.lenght > 0">
                <Breadcrumb :data="breadcrumb" />
              </div>  
            </div>
            <slot></slot>
          </div>
      </div>
    </MainLayout>
  </div>
</template>

<script>

import MainLayout from "./MainLayout"
import Sidebar from '../components/partials/Sidebar';
import Breadcrumb from '../components/partials/Breadcrumb.vue';

export default {
  name: 'DashboardLayout',
  components: {MainLayout, Sidebar,Breadcrumb},
  props: {
    breadcrumb: {
      type: Array,
      default: {}
    },
    title: {type: String, default: ''}
  }
}
</script>
