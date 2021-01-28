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

            let resultStatus = await Http.getJson(appConfig.currency_api,{
                symbols: to,
                format: 'json'
            })

            if(resultStatus.isError()) return resultStatus

            console.log(resultStatus)

            return Status.successPromise("",null)
        } catch (e) {
            Logger.error("CurrencyCore::getRate ",e)
            return Status.errorPromise(window._vue("currency_converter_error",[e]))
        }
    }

    /**
     * convert currency
     * @param {*} to 
     * @param {*} amount 
     */
    static async convertCurrency(to,amount){

        try {

            //lets get the currency rate 
            let currencyRateStatus = await this.getRate(to)

            if(currencyRateStatus.isError()) return currencyRateStatus 

            let rate = currencyRateStatus.getData()

        } catch (e) {
            Logger.error("CurrencyCore::convertCurrency ",e)
            return Status.errorPromise(window._vue("currency_converter_error",[e]))
        }
    }

}