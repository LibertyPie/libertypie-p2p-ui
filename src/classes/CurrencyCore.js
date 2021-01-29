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
    static async getRate(currency){
        try {

            let _currency = currency.toUpperCase()

            let cacheKey = `_currency_rate_${_currency}`

            let cachedData = Cache.get(cacheKey)

            if(cachedData != null) return Status.successPromise(null, cachedData[_currency])

            let resultStatus = await Http.getJson(appConfig.currency_api,{
                symbols: _currency,
                format: 'json',
                base: 'USD'
            })

            if(resultStatus.isError()) return resultStatus

            let resultData = resultStatus.getData()

            if(!(resultData.success || false)){
                Logger.error("CurrencyCore::getRate ",(new Error(resultData.msg || "")))
                return Status.errorPromise(window._vue("failed_to_fetch_currency_rates"))
            }

            if(Object.keys(resultData.rates || {}).length > 0){
                //lets cache the result
                //cache for 6hrs
                Cache.set(cacheKey, resultData.rates, 60 * 60  * 6);
            }

            return Status.successPromise("", resultData.rates[_currency])

        } catch (e) {
            Logger.error("CurrencyCore::getRate ",e)
            return Status.errorPromise(window._vue("currency_converter_error",[e]))
        }
    }

    /**
     * convert currency
     * @param {*} currency 
     * @param {*} amount 
     */
    static async convertCurrency(currency,amount){

        try {

            //lets get the currency rate 
            let currencyRateStatus = await this.getRate(currency)

            if(currencyRateStatus.isError()) return currencyRateStatus 

            let rate = currencyRateStatus.getData()

            let converted = rate * amount;
            let decimal = 2

            if(converted.toString().startsWith("0.")){
                decimal = 4
            } 

            let _converted = parseFloat(converted).toFixed(decimal)

            return Status.successPromise(null, _converted)

        } catch (e) {
            Logger.error("CurrencyCore::convertCurrency ",e)
            return Status.errorPromise(window._vue.$t("currency_converter_error",[e]))
        }
    }

    /**
     * convertByCountryCode
     */
    static async convertByCountry(countryCode, amount){
        try {

            let countryCodeAlpha = countryCode.toUpperCase()
            
            if(this.countryCurrencyMap == null) await this.getCurrencyByCountry(countryCode)

            return this.convertCurrency(this.countryCurrencyMap[countryCodeAlpha], amount)
        } catch (e){
            Logger.error("rateByCountry: ",e)
            return Status.errorPromise(window._vue("currency_converter_error",[e]))
        } 
    } //end fun 


    /**
     * get currency rate by country code
     * @param {String} countryCode 
     */
    static async getRateByCountry(countryCode){
        return this.convertByCountry(countryCode,1)
    }

    
    /**
     * get currency by country
     * @param {*} countryCode 
     */
    static getCurrencyByCountry(countryCode){
        return new Promise((resolve,reject)=>{
            //lets fetch the data 
            import("../data/currencies.js").then(async (result)=>{

                this.countryCurrencyMap = result.default
                
                resolve(result.default[countryCode.toUpperCase()])

            },(error) => {
                reject(error)
            })
        })
    } //end fun 

}