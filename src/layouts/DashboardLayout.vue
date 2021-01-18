<template>
  <div class="dashboard">
    <MainLayout>
      <slot></slot>
    </MainLayout>
  </div>
</template>

<script>

import MainLayout from "./MainLayout"

export default {
  name: 'Home',
  components: {MainLayout}
}
</script>
