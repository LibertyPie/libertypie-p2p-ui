/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

 export default class Logger {
     static error(msg, errObj={stack: ""}){
         console.error(msg)
         console.log(errObj, (errObj.stack || null))
     }
 }