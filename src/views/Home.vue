<template>
  <div class="home">
    <MainLayout>
      <QuickSearch />
    </MainLayout>
  </div>
</template>

<script>

import MainLayout from "../components/layouts/MainLayout"
import QuickSearch from "../components/partials/home/QuickSearch"

export default {
  name: 'Home',
  components: {MainLayout, QuickSearch}
}
</script>
