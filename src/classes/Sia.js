/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

import { SkynetClient } from "skynet-js";
import Logger from './Logger';
import Status from './Status';


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

            let client = new SkynetClient();

            const { skylink } = await client.uploadFile(file);

            console.log(skylink)

            return Status.successPromise("",skylink)
        } catch(e){
            Logger.error("Sia::save: Failed to save file data "+filename,e)
            return Status.errorPromise(window._vue.$t("failed_to_save_file_to_sia"))
        }
    } //end fun
}