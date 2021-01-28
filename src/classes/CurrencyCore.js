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

    static countryCurrencyMap = null;

    /**
     * get currency rate
     * @param {String} to 
     */
    static async getRate(to){
        try {

            let cacheKey = `_currency_rate_${to}`

            let cachedData = Cache.get(cacheKey)

            if(cachedData != null) return Status.successPromise(null, cachedData)

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

    /**
     * convertByCountryCode
     */
    static async convertByCountry(countryCode, amount){

        let countryCodeAlpha = countryCode.toUpperCase()

        return new Promise((resolve,reject)=>{

            if(this.countryCurrencyMap != null){
                resolve(this.convertCurrency(this.countryCurrencyMap[countryCodeAlpha], amount))
                return;
            }

            //lets fetch the data 
            import("../data/currencies.js").then(async (result)=>{

                this.countryCurrencyMap = result.default
                resolve(this.convertCurrency(this.countryCurrencyMap[countryCodeAlpha], amount))

            },(error) => {
                resolve(Status.errorPromise(window._vue("currency_converter_error",[error])))
                Logger.error("rateByCountry: ",error)
            })
        })
    }


    /**
     * get currency rate by country code
     * @param {String} countryCode 
     */
    static async getRateByCountry(countryCode){
        return this.convertByCountry(countryCode,1)
    }

}