/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

import Cache from './Cache'
import Status from './Status';
import Logger from './Logger';
import Http from './Http';
import appConfig from "../config/app"
export default class CurrencyCore {

    /**
     * get currency rate
     * @param {String} to 
     */
    static async getRate(to){
        try {

            let resultStatus = await Http.get(appConfig.currency_api,{
                symbols: to
            })
        } catch (e) {
            Logger.error("CurrencyCore::getRate ",e)
            return Status.errorPromise()
        }
    }
}