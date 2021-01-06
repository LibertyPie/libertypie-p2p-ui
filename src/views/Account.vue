<template>
  <div class="home">
    <MainLayout>
      
    </MainLayout>
  </div>
</template>

<script>

import MainLayout from "../components/layouts/MainLayout"
import QuickSearch from "../components/partials/home/QuickSearch"

export default {
  name: 'Account',
  components: {MainLayout, QuickSearch}
}
</script>
