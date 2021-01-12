/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */
import LibertyPie from '../classes/LibertyPie';
export default { 
    install(app, options) {
        //inject $libertypie in global space
        app.config.globalProperties.$libertypie = (new LibertyPie(app))
    }
 }