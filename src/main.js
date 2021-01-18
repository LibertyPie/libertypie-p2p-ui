import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from "./mixins/utils"
import _Globals from "./plugins/_Globals"
import _I18n from "./plugins/_I18n"

import 'simple-scrollbar'
import 'simple-scrollbar/simple-scrollbar.css';
import lozad from 'lozad'


let vueInstance = createApp(App)
    .use(_I18n)
    .mixin(utils)
    .use(store)
    .use(router)
    .use(_Globals)
    .mount('#app');

window._vue = vueInstance;

