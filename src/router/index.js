import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: "/account/:address",
    name: "account",
    component: import(
      /* webpackChunkName: "account" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */  
      "@/views/Account.vue"
    )
  },

  {
    path: "/dashboard",
    name: "account",
    component: import(
      /* webpackChunkName: "account" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */  
      "@/views/Dashboard.vue"
    )
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
