/**
 * LibertyPie (https://libertypie.com)
 * @license MIT
 */
const networkConfig = require("../config/network").default
const defaultNetwork = networkConfig.default_network;
import Status from "./Status"
import WalletProvider from "@libertypie/wallet-provider"
//import WalletConnect from "@walletconnect/web3-provider";
//import Portis from "@portis/web3"
//import WalletLink from 'walletlink'

/**
 * _WalletProvider Class
 * @class
 * @exports
 */
export default class _WalletProvider  {

    isConnected = false;
    hasInit = false
    _walletProvider = null;
    _vue = null;

    constructor(_vue){
        this._vue = _vue;
        this.initialize();
    }

    /**
     * initializes the class 
     */
    async initialize(){

         let defaultChainName = (networkConfig.networks || {})[defaultNetwork].name;
         
        if(window._walletInfo){
            return;
        }

        let infuraId = networkConfig.infura_id;

        let providerOpts = {

            /*portis: {
                package: Portis,
                connect_text: this._vue.$t("portis_connect_text"),
                options: {
                    dappId: networkConfig.portis_id,
                    network: defaultChainName
                }
            },

            walletconnect: {
                connect_text: this._vue.$t("walletconnect_connection_text"),
                name: "WalletConnect",
                package: WalletConnect,
                options: {
                    infuraId,
                    mobileLinks: [
                        "rainbow",
                        "metamask",
                        "argent",
                        "trust",
                        "imtoken",
                        "pillar",
                    ],
                }
            },
            "walletlink": {
                package: WalletLink,
                options: {
                    app: {
                        appName: "LibertyPie",
                        appLogoUrl: "https://libertypie.com/assets/img/logo.svg",
                        darkMode: false
                    },
                    network: {
                        rpc: `https://kovan.infura.io/v3/${infuraId}`,
                        //chainId: 0x2a
                    }
                }
            },*/
        }

        this._walletProvider = new WalletProvider({
            debug: true,
            cacheProvider: true,
            showLoader: true,
            providers: providerOpts
        })

        //lets check if there is  cache, lets connect with the cache 
        //but fail silently
        if(this._walletProvider.isProviderCached()){
           this.connectWallet(true)
        }

        /**
         * lets listen to wallet connection events
         */
        window.addEventListener("connect_wallet",()=>{
            this.connectWallet(false)
        })

        //lets rebroadcast some neccessary events
        this._walletProvider.on("chainChanged",(chainId)=>{

            this._vue._dispatchEvent("on-wallet-chain-changed",chainId)

            /*Swal.fire(
                this._vue.$t("chain_changed"),
                this._vue.$t("chain_changed_notice"),
                'question'
            )*/
            window.setTimeout(()=> window.location.reload(),3000)
        })

        this._walletProvider.on("accountsChanged",(newAccounts)=>{

            this._vue._dispatchEvent("on-wallet-accounts-changed",newAccounts)

            /*
            Swal.fire(
                this._vue.$t("account_change"),
                this._vue.$t("accounts_change_notice"),
                'question'
            )*/
            window.setTimeout(()=> window.location.reload(),3000)
        })
    } //ebd fun 
    
    /**
     * connectWallet
     * @param {boolean} [silentMode=true] should the connection be made silently
     */
    async connectWallet(silentMode = true){
        try {


            //console.log(connectStatus)

            //lets listen to connection events
            this._walletProvider.on("connectError",(err)=>{
                if(!silentMode){ this._vue.errorNotif(this._vue.$t(err.message)) }
            })

            //lets listen to connection events
            this._walletProvider.on("connect",(info)=>{ this.processOnConnect(info,silentMode) })

            await this._walletProvider.connect()

        } catch(e){
            window._utils.logError(e,e.stack)
        }
    }

    /**
     * handleOnConnect
     */
    async processOnConnect(info,isSilentMode){

        //lets check if the chainId we needed  is same as returned
        if(!this.isChainSupported(info.chainId)){
            if(!isSilentMode){ 
               /* Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: this._vue.$t('unsupported_chain',[info.chainId]),
                    footer: '<a href>Why do I have this issue?</a>'
                })*/
            }

            return false;
        }
        
      
        if(!isSilentMode){ 
            /*Swal.fire({
                icon: 'success',
                title: this._vue.$t("wallet_connected"),
                showConfirmButton: false,
                timer: 2000
            })*/
         }
         
         this.isConnected = true;

         window["isWalletConnected"] = true;
         window["_walletInfo"] = info;

        //lets broadcast wallet success
        this._vue._dispatchEvent("on-wallet-connect",info)

    } //end 

    /**
     * isChainSupported
     * @param {number} chainId - the chainId to validate
     * @returns {boolean} - wether chainId is valid or not
     */
    isChainSupported(chainId){

        if(chainId == null){
            return false;
        }

        //web3 networks 
        let web3Networks = networkConfig.networks || {};

        let defaultChainInfo = web3Networks[defaultNetwork] || {}

        if(chainId != defaultChainInfo.chain_id){
            return false;
        }

        return true;
    } //end fun

}

