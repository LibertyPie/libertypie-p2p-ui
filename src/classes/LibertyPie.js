/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

import NetConfig from "../config/network"
import Status from './Status';
import Web3Net from "./Web3Net"
const libertyPieAbi = require("../abi/libertypie.json")
const chainNets = NetConfig.networks;
const defaultNetName = NetConfig.default_network;

export default class LibertyPie {

    _web3Net = null;

    constructor(){
        let defaultNetConfig = chainNets[defaultNetName];
        console.log(defaultNetConfig)
        this._web3Net = new Web3Net(defaultNetConfig.contractAddress,libertyPieAbi)
    }

    /**
     * getPaymentTypes
     */
    async getAllPaymentTypes(cache=true){
        try {

            let cacheKey = "__paymentTypes"

            let resultStatus = await this._web3Net.requestContractPublicData("getPaymentTypesAndCats")

            if(resultStatus.isError()){
                return resultStatus;
            }

            let resultData = resultStatus.getData() || [];

            let categoriesArray = resultData[0] || [];

            let paymentTypesArray = resultData[1] || [];

            let processedPaymentTypes = [];

            for(let data of paymentTypesArray){
                
                let id   = data.id || null 
               
                if(id == null || id == ""){continue; }
                
                let name = data.name
                let catId = data.categoryId.toNumber()

                processedPaymentTypes[id] = {
                    id,
                    name,
                    catId
                }
            }

            return Status.successPromise(null, {
                paymentTypes: processedPaymentTypes,
                categories: categoriesArray
            })
        } catch(e){
            console.log(e,e.stack)
        }
    }
}