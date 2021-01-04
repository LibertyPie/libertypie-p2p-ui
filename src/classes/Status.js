/**
 * Status file
 */

export default class Status {

    type = "";
    msg = "";
    data = null;
    code = null;

    buildStatus(type, msg, data) {
        this.type = type;
        this.msg  = msg;
        this.data = data;

        return this;
    }

    isError() {
        return this.type == "error";
    }

    isSuccess() {
        return this.type == "success"; 
    }

    getType() {
        return this.type;
    }

    getMessage(){
        return this.msg;
    }

    setCode(code){
        this.code = code;
        return this;
    }

    getCode(){
        return this.code;
    }

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

    static neutral(msg, data = null) {
        return (new Status()).buildStatus("neutral",msg,data)
    }
}
