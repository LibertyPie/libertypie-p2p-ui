/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

 export default class Logger {
     static error(msg, errObj){
         console.error(msg,errObj.stack)
     }
 }