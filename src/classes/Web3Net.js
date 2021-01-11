/**
 * LibertyPie (https://libertypie.com)
 * @license MIT
 */
import NetConfig from "../config/network"
import Status from './Status';
const chainNets = NetConfig.networks;
const defaultNetName = NetConfig.default_network;
const ethers = require('ethers');


export default class Web3Net {


    // public provider
    publicProvider = null;

    //contract Address
    contractAddress = null;
   
    //abi for the contract
    abi = null;

    constructor(_contractAddress,_abi){
        this.contractAddress = _contractAddress;
        this.abi = _abi;
    }

    /**
     * get public provider
     */
    getPublicProvider(){
       
        if(Web3Net.publicProvider != null){
            return this.publicProvider;
        }

        //lets get the public rpc from our networks
        let defaultNetConfig = chainNets[defaultNetName]

        let rpc = (defaultNetConfig.rpc || [])[0]
        
        //lets get the rpc 
        let currentProvider = new web3.providers.HttpProvider(rpc);

        let web3Provider = new ethers.providers.Web3Provider(currentProvider);

        this.publicProvider = web3Provider;

        return web3Provider;
   }//end 

   /**
    * request public data from the chain using the provided in networks config
    * @param {*} method 
    * @param {*} params 
    */
    async requestContractPublicData(
       method,
       params = null
    ){

        try{

            if(window._walletInfo){
                return this.request(method,params)
            }

            if(this.publicProvider == null){
                this.getPublicProvider()
            }

            let contract = new ethers.Contract(this.contractAddress, this.abi, this.publicProvider);

            console.log(contract)
            
            let result = await contract[method](params);

            return Status.successPromise(null,result)
        } catch(e){
            console.log(e,e.stack)
            return Status.errorPromise("request_failed",e)
        }
   } //end 

   /**
    * make request to the chain
    * @param {*} method 
    * @param {*} params 
    */
   static async requestContract(method,params){

   } //end fun 


}