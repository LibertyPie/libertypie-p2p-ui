import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './mixins/i18n'
import utils from "./mixins/utils"
import _Globals from "./plugins/_Globals"

let vueInstance = createApp(App)
    .mixin(i18n)
    .mixin(utils)
    .use(store)
    .use(_Globals)
    .use(router)
    .mount('#app');

window._vue = vueInstance;
