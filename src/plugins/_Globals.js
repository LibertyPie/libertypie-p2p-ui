/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */
import LibertyPie from '../classes/LibertyPie';
import Loader from "../components/partials/Loader.vue";
import HTTP from '../classes/Http';
import Geo from "../classes/Geo"

export default { 
    install(app, options) {

        HTTP.loadPolyfill();

        //inject $libertypie in global space
        app.config.globalProperties.$libertypie = (new LibertyPie(app))

        app.config.globalProperties.$httpGet = HTTP.get;
        app.config.globalProperties.$httpPost = HTTP.post;
        app.config.globalProperties.$getJson = HTTP.getJson;

        //register global component
        app.component("Loader",Loader)

        //lets set user country
        Geo.getCountry().then((resultStatus)=>{
            if(resultStatus.isError()) return;
            console.log(options)
        }) //end 

    }
 }