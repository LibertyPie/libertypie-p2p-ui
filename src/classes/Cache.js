/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

/**
 * Cache class 
 * @class 
 * @typedef {Object} Cache 
 */
 class Cache {

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
        let cachedData = localStorage.getItem(this.formatKey(key))
        if(typeof cachedData != 'object'){ return null; }
        return cachedData.d;
    }

    /**
     * store cache
     * @param {string} key - cache key
     * @param {*} value - the data to be cached
     * @param {number} [expiry=0] - the expiry in milliseconds, 0 means no expiry 
     * @returns {boolean}
     */
    store(key,value,expiry=0){

    }//end fun 
    
}