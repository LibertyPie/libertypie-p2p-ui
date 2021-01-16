/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */


 export default class HTTP {

    static async loadPolyfill(){
        return new Promise((resolve,reject)=>{
            if(!window.fetch){
               
                import("../../node_modules/whatwg-fetch").then((result)=>{
                    
                    window["fetch"] = result.fetch;

                    resolve()
                });

            } else {
                resolve()
            }
        });
    }

    /**
     * http get
     * @param {string} url 
     * @param {Object} data 
     * @param {Object} headers 
     */
    static async get(url,data = {}, headers = {}){
        url += (url.indexOf('?') === -1 ? '?' : '&') + this.queryParams(data);
        return this.request(url,{headers})
    } //end fun

 
    /**
     * http post
     * @param {*} url 
     * @param {*} data 
     * @param {*} headers 
     */
    static async post(url,data = {}, headers = {}){

    } //end fun 

    /**
     * queryParams
     * @param {*} params 
     */
    static queryParams(params) {
       let ec = encodeURIComponent;
        return Object.keys(params).map(k => ec(k) + '=' + ec(params[k])).join('&');
    }

    /**
     * request
     * @param {*} url 
     * @param {*} params 
     */
    static async request(url,params){

        let rparams = {
            ...{
                "credentials": "omit",
                "redirect": "follow"
            },
            ...params
        }
       
        try {

            await this.loadPolyfill();

            let response = await fetch(url,rparams);

            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            }

            return Promise.reject(new Error(response.statusText))

        } catch(e){
            return Promise.reject(e)
        }
    } //end 

 }