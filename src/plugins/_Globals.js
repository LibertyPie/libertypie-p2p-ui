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

        //register global component
        app.component("Loader",Loader)
       


        let _globals = app.config.globalProperties;

        //inject $libertypie in global space
        _globals.$libertypie = (new LibertyPie(app))

        _globals.$httpGet = HTTP.get;
        _globals.$httpPost = HTTP.post;
        _globals.$getJson = HTTP.getJson;


        //attach user country
        _globals.$userCountry = async () => {
            
            let countryInfoStatus = await Geo.getCountry();
           
            if(countryInfoStatus.isError()) return ""

            return ((countryInfoStatus.getData() || {}).isoCode || "")
        } //end 

    }  // install
 }