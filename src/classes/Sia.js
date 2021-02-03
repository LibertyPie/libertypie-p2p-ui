/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */
import Logger from './Logger';
import Status from './Status';
import Http from './Http';
import sia from "../config/sia";


 /**
 * Sia Skynet class
 * @class
 * @exports 
 */
export default class Sia {

    static async getClient() {
        let c = new SkynetClient();
        return c;
    }

    /**
     * save
     * @param {*} data
     * @returns Promise<Status>
     */
    static async save(filename, data){

        try {
            
            //lets convert the data to json 
            let d = JSON.stringify({d: data})

            //lets create file obj
            let file = new File([d],filename, {
                type: "text/plain",
            })

            let resultStatus = await Http.post(sia.getUploadUrl(),{
                file
            })

            if(resultStatus.isError()) return resultStatus;

            let httpResponse = resultStatus.getData()

            let result = await httpResponse.json()
            
            return Status.successPromise("", result.skylink)

        } catch(e){
            Logger.error("Sia::save: Failed to save file data "+filename,e)
            return Status.errorPromise(window._vue.$t("failed_to_save_file_to_sia"))
        }
    } //end fun
}