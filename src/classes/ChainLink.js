/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

import NetConfig from "../config/network"
const chainNets = NetConfig.networks;
const defaultNetName = NetConfig.default_network;
import chainlinkConfig from "../config/chainlink"

const aggregatorV3InterfaceABI = require("../abi/chainlink_aggregator_v3");

/**
 * Custom methods for LibertyPie contract's methods
 * @class
 * @typedef {object} 
 * @exports 
 */
export default class ChainLink {

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
            let pairContract = chainlinkConfig[pair] || null;

            if(pairContract == null){
                Logger.error(`getPriceFeed: Missing contract address for ${pair} on ${defaultNetName}`)
                return Status.errorPromise("failed_to_fetch_price_feed",[pair])
            }

            //this isnt libertypie function, so we will start a new instance of 
            // web3Net
            let web3Net = new Web3Net(pairContract,aggregatorV3InterfaceABI)
            
            let resultStatus = await web3Net.requestContractPublicData("latestRoundData")

            console.log(resultStatus)
            
            return resultStatus;
        } catch (e) {
            //Logger.error(`getPriceFeed Error`,e)
            console.log(e)
            return Status.errorPromise("system_error")
        }
    }//end pair
}
