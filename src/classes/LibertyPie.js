/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

import NetConfig from "../config/network"
import Status from './Status';
import Web3Net from "./Web3Net"
import Cache from './Cache';
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

    constructor(){
        let defaultNetConfig = chainNets[defaultNetName];
        this._web3Net = new Web3Net(defaultNetConfig.contractAddress,libertyPieAbi)
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
                Cache.set(cacheKey,finalData,(60 * 5 * 1000))
            }

            return Status.successPromise(null, finalData)
        } catch(e){
            console.log(e,e.stack)
        }
    }
}