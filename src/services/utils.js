import Status from "../classes/Status";
require("../../node_modules/noty/src/noty.scss");
require("../../node_modules/noty/src/themes/sunset.scss");
import Swal from 'sweetalert2'

const  Noty = require('noty');

Noty.overrideDefaults({
    layout   : 'topRight',
    theme    : 'sunset',
    closeWith: ['click', 'button'],
    progressBar: true,
    timeout: 5000
});

export default {
    created(){},
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

        notif(type, text){
            new Noty({
                type,
                text
            }).show();
        },

        errorNotif(msg){ this.notif("error",msg) },

        infoNotif(msg){ this.notif("info",msg) },

        successNotif(msg){ this.notif("success",msg) },

        alertNotif(msg){ this.notif("alert",msg)  },

        statusNotif(statusInfo){ this.notif(statusInfo.getType(),statusInfo.getMessage())  }
    },  

}