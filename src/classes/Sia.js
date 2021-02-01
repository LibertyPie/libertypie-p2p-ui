/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

import { SkynetClient } from "skynet-js";


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
     */
    static async save(filename, data){

        try {
            
            //lets convert the data to json 
            let d = JSON.stringify({d: data})

            //lets create file obj
            let f = new File([d],filename, {
                type: "text/plain",
            })
        } catch(e){

        }
    } //end fun
}