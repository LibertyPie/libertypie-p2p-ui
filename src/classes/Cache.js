/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

/**
 * Cache class 
 * @class 
 * @typedef {Object} Cache 
 * @exports
 */
 export default class Cache {

    /**
     * cache key prefix
     * @type {string}
     */
    static prefix = "_cache";

    /**
     * format the key with a prefix
     * @param {string} key 
     * @returns {string}
     */
    static formatKey(key){
        return `${Cache.prefix}_${key}`;
    }

    /**
     * cache has data
     * @param {string} key - cache key
     * @returns {boolean}
     */
    static has(key){
      return (this.get(key) != null)   
    }

    /**
     * get cache item
     * @param {string} key - cache key
     * @returns {*} - cached value
     */
    static get(key){

        let data = localStorage.getItem(this.formatKey(key)) || ""
        
        if(data.trim().length == 0) return null; 

        let dataObj = JSON.parse(data)

        if(typeof dataObj != 'object') return null;

        //if expired remove it
        if( Date.now() > dataObj.e){
            this.remove(key)
        }

        return dataObj.v;
    } //end fun

    /**
     * store cache
     * @param {string} key - cache key
     * @param {*} value - the data to be cached
     * @param {number} [expiry=0] - the expiry in seconds, 0 means no expiry 
     * @returns {boolean}
     */
    static set(key,value,expiry=0){
        if(expiry>0){ expiry = (Date.now() + (expiry * 1000))}
        let data = JSON.stringify({v: value, e: expiry})
        localStorage.setItem(this.formatKey(key),data)
        return true;
    }//end fun 
 
    
    /**
     * remove Cache
     * @param {*} value - the data to be cached
     * @returns {boolean}
     */
    static remove(key){
        localStorage.removeItem(this.formatKey(key))
        return true;
    }

}