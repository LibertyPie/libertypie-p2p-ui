import Status from "../classes/Status";

export default {

    created(){ 
        $(".alert").alert();
    },
    methods: {
        
        errorStatus(msg,data){ return Status.error(msg,data) },
        errorPromise(msg,data){ return Status.errorPromise(msg,data) },
        errorData(data = null){ return Status.errorData(data) },
        successStatus(msg,data = null){ return Status.success(msg,data) },
        successPromise(msg,data = null){ return Status.successPromise(msg,data) },
        successData(data = null){ Status.successData(data) },

        logError(msg,error){
            console.log(msg, error, error.stack || "")
        },
        
        notif(type,msg, timeout=3000){

            type = (type == "error") ? "danger" : type;
            
            let markup = `
                <div class="alert alert-${type} shadow-lg alert-notif alert-dismissible fade show" role="alert">
                    <div class="d-flex flex-row px-2 align-items-center justify-content-center">
                        <div class="flex-grow-1 py-5">${msg}</div>
                        <div class="ml-auto">
                            <button 
                                type="button" 
                                class="close position-relative p-0 ml-2" 
                                data-dismiss="alert"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div class="notif-progress"></div>
                </div>
            `

            let alertDom = $(markup)

            $("body").append(alertDom)

            if(timeout <= 0) return;

            let tProgress = alertDom.find(".notif-progress")
            
            let intval = 10;
            let elapsed = 0;

            let t = window.setInterval(()=>{
                
                elapsed += intval;
                
                if(elapsed >= timeout) {
                    clearInterval(t)
                    alertDom.alert("close");
                    return;
                }

                let elapsedPercent = (elapsed / timeout) * 100;
                
                tProgress.css("width",elapsedPercent+"%");
            },intval);
      
        },

        _dispatchEvent(name,data){
            window.dispatchEvent(new CustomEvent(name, {detail: data}));
        },

        _on(eventName,callback){
            window.addEventListener(eventName,callback)
        },

        errorNotif(msg){ this.notif("error",msg) },

        infoNotif(msg){ this.notif("info",msg) },

        successNotif(msg){ this.notif("success",msg) },

        alertNotif(msg){ this.notif("alert",msg)  },

        statusNotif(statusInfo){ this.notif(statusInfo.getType(),statusInfo.getMessage())  },

        /**
         * slugify
         */
        slugify(text){
            return text.trim()
                        .toLowerCase()
                        .replace(/\s+/g, '-')           
                        .replace(/[^\w\-]+/g, '')
                        .replace(/\-\-+/g, '-') 
        },

        //check if payment type is valid
        async validatePaymentType(pid){
            
           
            let paymentTypesStatus = await this.$libertypie.getAllPaymentTypes(true)

            //console.log(paymentTypesStatus)

            if(paymentTypesStatus.isError()){
                return paymentTypesStatus;
            } else {
                this.paymentTypesData = (paymentTypesStatus.getData() || {});
            }
            

            //console.log(this.paymentTypesData)

            for(let index in this.paymentTypesData){
                if(pid == this.paymentTypesData[index].id){
                    return Status.successPromise("")
                }
            }

            return Status.errorPromise(this.$t("unknown_payment_method"))
        }, //end fun 


        /**
         * formatMoney
         */
        formatMoney(value){

            let d = 2;
            if(value.toString().startsWith("0.")){
                d = 4;
            }

            return parseFloat(value).toFixed(d)
        },

        formatMoneyAsText(value){
            if(value == null || !value) return "";
            return this.formatMoney(value)
                       .replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
        },


        isWalletConnected() { 
            return (window["isWalletConnected"] || false);
        }
    },  

}