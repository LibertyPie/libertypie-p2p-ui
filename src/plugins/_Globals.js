/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */
import LibertyPie from '../classes/LibertyPie';
import Loader from "../components/partials/Loader.vue";
import Geo from "../classes/Geo"
import Http from '../classes/Http';

export default { 
    install(app, options) {

        Http.loadPolyfill();

        //register global component
        app.component("Loader",Loader)
       


        let _globals = app.config.globalProperties;

        //inject $libertypie in global space
        _globals.$libertypie = (new LibertyPie(app))

        _globals.$httpGet = Http.get;
        _globals.$httpPost = Http.post;
        _globals.$getJson = Http.getJson;


        //attach user country
        _globals.$userCountry = async () => {
            
            let countryInfoStatus = await Geo.getCountry();
           
            if(countryInfoStatus.isError()) return ""

            return ((countryInfoStatus.getData() || {}).isoCode || "")
        } //end 

    }  // install
 }