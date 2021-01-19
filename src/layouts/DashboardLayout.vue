<template>
  <div class="dashboard">
    <MainLayout>
      <div class="d-flex flex-row"> 
          <div class="sidebar">
              <Sidebar />
          </div>
          <div class="main-content flex-grow-1"> 
            <slot></slot>
          </div>
      </div>
    </MainLayout>
  </div>
</template>

<script>

import MainLayout from "./MainLayout"
import Sidebar from '../components/partials/Sidebar';

export default {
  name: 'DashboardLayout',
  components: {MainLayout, Sidebar}
}
</script>
