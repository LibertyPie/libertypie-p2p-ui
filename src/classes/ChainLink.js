/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

import NetConfig from "../config/network"
const chainNets = NetConfig.networks;
const defaultNetName = NetConfig.default_network;
import chainlinkConfig from "../config/chainlink"
import Status from './Status';
import Logger from './Logger';
import Web3Net from "./Web3Net"
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";

const aggregatorV3InterfaceABI = require("../abi/chainlink_aggregator_v3");

/**
 * Custom methods for LibertyPie contract's methods
 * @class
 * @typedef {object} 
 * @exports 
 */
export default class ChainLink {

    /**
     * 
     * @param decimal
     */
    defaultDecimal = 8;


    /**
     * getPriceFeed
     */
    async getPriceFeed(pair){

        try{
            //lets get the default chain config 
            let defaultConfig = chainlinkConfig[defaultNetName] || null;

            if(defaultConfig == null){
                Logger.error("getPriceFeed: Failed to fetch chainlink config for "+defaultNetName)
                return Status.errorPromise("system_error")
            }

            //lets retrieve the pair contract 
            let pairInfo = defaultConfig[pair] || {};

            let pairContract = pairInfo.contract || null;

            let decimal = pairInfo.decimal || this.defaultDecimal;

            if(pairContract == null){
                Logger.error(`getPriceFeed: Missing contract address for ${pair} on ${defaultNetName}`)
                return Status.errorPromise("failed_to_fetch_price_feed")
            }

            //this isnt libertypie function, so we will start a new instance of 
            // web3Net
            let web3Net = new Web3Net(pairContract,aggregatorV3InterfaceABI)
            
            let resultStatus = await web3Net.requestContractPublicData("latestRoundData")

           
            if(resultStatus.isError()){
                return resultStatus;
            }

            let data = resultStatus.getData();

            let roundData = formatUnits(data.answer,decimal)

            return Status.successPromise(null,roundData);

        } catch (e) {
            Logger.error(`getPriceFeed Error`,e)
            return Status.errorPromise("system_error")
        }

    }//end pair



}
