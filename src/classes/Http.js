/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

 import Status from "./Status"
 import Logger from "./Logger"

 export default class Http {

    static async loadPolyfill(){
        return new Promise((resolve,reject)=>{
            if(!window.fetch){
               
                import("whatwg-fetch").then((result)=>{
                    
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
     * getJson
     * @param {*} url 
     * @param {*} data 
     * @param {*} headers 
     */
    static async getJson(url, data = {}, headers = {}){
        try {

            let reqStatus = await this.get(url,data,headers)

            if(reqStatus.isError()) return reqStatus

            let responseObj = reqStatus.getData()

            let respBody =  (await responseObj.text()).trim();

            let respJson = (respBody.length ==  0) ? {} : JSON.parse(respBody)

            return Status.successPromise(null, respJson)

        } catch (e) {
            Logger.error(`getJson Error: ${url}`,e)
            return Status.successPromise("request_failed",e)
        }
    } //end fun
 
    /**
     * http post
     * @param {*} url 
     * @param {*} data 
     * @param {*} headers 
     */
    static async post(url,data = {}, headers = {}){

        let formData = new FormData()
        for(let key in data){ formData.append(key,data[key])}

        return this.request(url,{
            method: "POST",
            body: formData,
            headers
        })
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
                //"credentials": "omit",
                "redirect": "follow"
            },
            ...params
        }
       
        try {

            await this.loadPolyfill();

            let response = await fetch(url,rparams);

            if (response.status >= 200 && response.status < 300) {
                return Status.successPromise(null,response)
            }

            return Status.successPromise("request_failed",new Error(response.statusText))

        } catch(e){
            Logger.error(`request Error: ${url}`,e)
            return Status.successPromise("request_failed",e)
        }
    } //end 

 }
