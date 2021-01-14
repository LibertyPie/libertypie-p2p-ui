/**
 * LibertyPie (https://libertypie.com)
 * @license MIT
 */
import NetConfig from "../config/network"
import Status from './Status';
import _WalletProviderCore from './_WalletProvider';
const chainNets = NetConfig.networks;
const defaultNetName = NetConfig.default_network;
import { Contract, providers } from 'ethers';
const ethProvider = require('eth-provider')

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
        let currentProvider = ethProvider([rpc]);

        let web3Provider = new providers.Web3Provider(currentProvider);

        this.publicProvider = web3Provider;

        return web3Provider;
   }//end 

   /**
    * request public data from the chain using the provided in networks config
    * @param {String} method 
    * @param {Object} params 
    */
    async requestContractPublicData(
       method,
       params = null
    ){

        try{

            if(window._walletInfo){
                return this.requestContract(method,params)
            }

            if(this.publicProvider == null){
                this.getPublicProvider()
            }

            return await this.execRequest(this.publicProvider,method, params);
        } catch(e){
            console.log("Web3Net::requestContractPublicData",e,e.stack)
            return Promise.reject(e);
        }
   } //end 

   /**
    * make request to the chain
    * @asy
    * @param {String} method 
    * @param {Object} params 
    * @returns {Promise<Status>}
    */
    async requestContract(method,params){
        try{ 

            if(!window._walletInfo || Object.keys(window._walletInfo).length == 0){
               
                //lets force wallet connection
               let _walletProvider = new _WalletProviderCore(window._vue)
                              
               let connectStatus = await _walletProvider.connectWallet(false);
               
               if(connectStatus.isError()){
                   return connectStatus;
               } 
            }

            let web3Provider = new providers.Web3Provider(window._walletInfo.provider);
            
            return await this.execRequest(web3Provider,method, params);

        } catch(e){
            console.log("Web3Net::requestContract",e,e.stack)
            return Promise.reject(e);
        }
   } //end fun 

   /**
    * execRequest, internally execute request providing the provider
    * @async
    * @param {*} provider
    * @param {String} method 
    * @param {Object} params 
    */
    async execRequest(provider, method, params){
        try{

            let contract = new Contract(this.contractAddress, this.abi, provider);

            let result = await contract[method](params);

            return Status.successPromise(null,result)
        } catch (e){
            console.log(e,e.stack)
            return Promise.reject(e);
        }
    }   
}