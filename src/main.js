import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './mixins/i18n'
import utils from "./mixins/utils"


createApp(App)
    .mixin(i18n)
    .mixin(utils)
    .use(store)
    .use(router)
    .mount('#app');
