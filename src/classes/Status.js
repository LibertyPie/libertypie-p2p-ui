/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 * The status Class responsible for handling Status of any activity
 * @class
 * @exports
 * @typedef {Status}
 */
export default class Status {
    /**
     * @typedef {string} status type, which is error, info & success
     */
    type = "";

    /**
     * @typedef {string|null} status message
     */
    msg = "";

    /**
     * @typedef {any|null} data accompanying the status 
     */
    data = null;

    /**
     * @typedef {number|null} status code
     */
    code = null;

    /**
     * build the status object, mostly used internally
     * @param {string} type 
     * @param {string} msg 
     * @param {any|null} data 
     * @returns {Status}
     */
    buildStatus(type, msg, data) {
        this.type = type;
        this.msg  = msg;
        this.data = data;
        return this;
    }

    /**
     * is the current status an error
     * @returns {boolean}
     */
    isError() {
        return this.type == "error";
    }

    /**
     * is the current status an info
     * @returns {boolean}
     */
    isSuccess() {
        return this.type == "success"; 
    }

    /**
     * get the current status type
     * @returns {string}
     */
    getType() {
        return this.type;
    }

    /**
     * get the current status data 
     * @returns {any|null}
     */
    getData(){ return this.data; }

    /**
     * get the current status message 
     * @returns {string|null}
     */
    getMessage(){
        return this.msg;
    }

    /**
     * set the status code 
     * @param {number|null} 
     * @returns {Status}
     */
    setCode(code){
        this.code = code;
        return this;
    }

    /**
     * get the current status message 
     * @returns {number|null}
     */
    getCode(){
        return this.code;
    }

    /**
     * set success status
     * @param {string} msg 
     * @param {any|null} data 
     * @alias
     * @returns {Status}
     */
    static success(msg, data = null) {
        return (new Status()).buildStatus("success",msg,data)
    }

    static successData(data) {
        return (new Status()).buildStatus("success","",data)
    }

    static async successPromise(msg, data = null) {
        return Promise.resolve((new Status()).buildStatus("success",msg,data))
    }

    static error(msg, data = null) {
        return (new Status()).buildStatus("error",msg,data)
    }

    static async errorPromise(msg, data = null) {
        return Promise.resolve((new Status()).buildStatus("error",msg,data))
    }

    static info(msg, data = null) {
        return (new Status()).buildStatus("neutral",msg,data)
    }
}
