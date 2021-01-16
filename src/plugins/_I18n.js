/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */
import I18n from '../classes/I18n';

export default { 
   async  install(app, options) {
      let i18n = new I18n()
      await i18n.initialize();
      app.config.globalProperties.$t =   (key,params) => {
         return i18n.translate(key,params)
      }
    }
 }