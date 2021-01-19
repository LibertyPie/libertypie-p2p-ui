<template>
  <div class="home">
    <MainLayout>
      
    </MainLayout>
  </div>
</template>

<script>

import MainLayout from "../layouts/MainLayout.vue"
import QuickSearch from "../components/partials/home/QuickSearch.vue"

export default {
  name: 'Account',
  components: {MainLayout, QuickSearch}
}
</script>
