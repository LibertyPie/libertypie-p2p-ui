/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

import NetConfig from "../config/network"
import Status from './Status';
import Web3Net from "./Web3Net"
import Cache from './Cache';
import Logger from './Logger';
const libertyPieAbi = require("../abi/libertypie")
const chainNets = NetConfig.networks;
const defaultNetName = NetConfig.default_network;

/**
 * Custom methods for LibertyPie contract's methods
 * @class
 * @typedef {object} LibertyPie 
 */
export default class LibertyPie {

    _web3Net = null;
    _vue = null;

    constructor(){
        let defaultNetConfig = chainNets[defaultNetName];
        this._web3Net = new Web3Net(defaultNetConfig.contractAddress,libertyPieAbi)
        this._vue = window._vue;
    }

   /**
    * getAllPaymentTypes
    * @param {boolean} [cache=true] wether the results should be cached or not
    * @returns {Object} {paymentsType,categories}
    */
    async getAllPaymentTypes(cache=true){
        try {

            let cacheKey = "_payment_types"

            if(cache){
                let cacheData = Cache.get(cacheKey)
                if(cacheData != null){
                    return Status.successPromise("",cacheData)
                }
            }

            let resultStatus = await this._web3Net.requestContractPublicData("getPaymentTypesAndCats")

            if(resultStatus.isError()){
                return resultStatus;
            }

            let resultData = resultStatus.getData() || [];

            let categoriesArray = resultData[0] || [];

            let paymentTypesArray = resultData[1] || [];

            let processedPaymentTypes = [];

            for(let data of paymentTypesArray){
                
                let idNum   = data.id || null 

                if(idNum == null || idNum == ""){continue; }
                
                let id = idNum.toNumber()
                let name = data.name
                let catId = data.categoryId.toNumber()

                processedPaymentTypes[id] = {
                    id,
                    name,
                    catId
                }
            }

            let finalData = {
                paymentTypes: processedPaymentTypes,
                categories: categoriesArray
            };

            if(cache){
                //cache for 3 minute
                Cache.set(cacheKey,finalData,(60 * 5))
            }

            return Status.successPromise(null, finalData)
        } catch(e){
            Logger.error("getAllPaymentTypes",e)
            return Status.errorPromise(this._vue.$t("request_failed",["Payment Methods",e]))
        }
    }

    /**
     * fetchAssets
     */
    async fetchAssets(cache = true){


        let cacheKey = "_assets_"

        if(cache){
            let cacheData = Cache.get(cacheKey)
            if(cacheData != null){
                return Status.successPromise("",cacheData)
            }
        }

        try{

            let resultStatus = await this._web3Net.requestContractPublicData("getAllAssets")

            return Promise.resolve(resultStatus)
            
        } catch (e){
            Logger.error("fetchAssets",e)
            return Status.errorPromise(this._vue.$t("request_failed",["Assets",e]))
        }
    }

}