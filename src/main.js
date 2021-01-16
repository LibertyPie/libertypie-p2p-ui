import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from "./mixins/utils"
import _Globals from "./plugins/_Globals"
import _I18n from "./plugins/_I18n"

import 'simple-scrollbar'
import 'simple-scrollbar/simple-scrollbar.css';

let vueInstance = createApp(App)
    .use(_I18n)
    //.mixin(i18n)
    .mixin(utils)
    .use(store)
    .use(_Globals)
    .use(router)
    .mount('#app');

window._vue = vueInstance;
