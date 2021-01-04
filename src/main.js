import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import VueI18n from 'vue-i18n'
import i18n from './services/i18n'
import utils from "./services/utils"
import WalletProviderCore from "./classes/WalletProviderCore"
import LogRocket from 'logrocket';


//init logging 
//declarations first before initialization
LogRocket.init('wtpj8t/libertypie');

let _app = createApp(App)
    .mixin(i18n)
    .mixin(utils)
    .use(store)
    .use(router)
    .mount('#app');

window._vue_app = _app;

//lets  now initialize wallet provider 
(new WalletProviderCore().initialize())