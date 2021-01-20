import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: "/dashboard/account",
    name: "dashboard_account",
    component: import(
      /* webpackChunkName: "account" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */  
      "@/views/Account.vue"
    )
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: import(
      /* webpackChunkName: "dashboard_home" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */  
      "@/views/dashboard/DashboardHome.vue"
    )
  },

  {
    path: "/dashboard/offers",
    name: "dashboard_offers",
    component: import(
      /* webpackChunkName: "dashboard_offers" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */  
      "@/views/dashboard/Offers.vue"
    )
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
