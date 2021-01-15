/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */
import LibertyPie from '../classes/LibertyPie';
import Loader from "../components/partials/Loader.vue";

export default { 
    install(app, options) {
        //inject $libertypie in global space
        app.config.globalProperties.$libertypie = (new LibertyPie(app))

        //register global component
        app.component("Loader",Loader)
    }
 }