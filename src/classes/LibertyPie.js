/**
 * LibertyPie (https://libertypie.com)
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
    async getAllPaymentTypes(){
        try {

            let resultStatus = await this._web3Net.requestContractPublicData("getPaymentTypesAndCats")

            console.log(resultStatus)
        } catch(e){
            console.log(e,e.stack)
        }
    }
}