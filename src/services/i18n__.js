import { ref, reactive, computed } from "vue";
import i18nConfig from "../config/i18n"

export default {
    
    setup(){

        let  supportedLocales = reactive(i18nConfig.supported_locales || [])
        let defaultLocale     = i18nConfig.default_locale || "en";
        let currentLocale     = ref(defaultLocale);
        let currentLocaleData = reactive({})
        let cachedLocaleData  = reactive({})
        let localesDir        = i18nConfig.locales_dir || "@/locales/";
        //let lang

        // fetch current lang 
        setLang = async (locale = "en") => {
            
            //if in format en-US or en-GB
            if(locale.indexOf("-") !== -1){
                locale = locale.split("-")[0]
            }

            if(!supportedLocales.includes(locale)){
                locale = defaultLang
            }

            currentLocaleData = require(localesDir+"/"+locale+".json")

            cachedLocaleData[locale] = currentLocaleData;

            window.localStorage.setItem("locale",locale)

            //("locale-change",{lang: lang})

            currentLocale.value = locale
        }

        getLocale = () => {
            let browserLang = navigator.language || navigator.userLanguage
            let userLang = sessionStorage.getItem("lang") || browserLang || "en"
            return userLang
        }

        translate = (key,params = null) => {
    
            if(!currentLocaleData.hasOwnProperty(key)){
                return key
            }
    
            let str =  currentLocaleData[key]
            
            if(str == key){ return str}
            
            if(Array.isArray(params) && params.length > 0){
               
                str = str.replace(/\{[0-9]+\}/g, function(match) {
                    match = match.replace(/[\{\}]+/g,"")
                    return params[match] || match;
                });
            }
    
            return str
        }

        return { "$t": translate, getLocal, setLang }
    }

}

