/**
 * LibertyPie 
 * @license MIT
 */
const networkConfig = require("../config/network").default
const defaultNetworkId = networkConfig.default_network;
import Status from "./Status"
import WalletProvider from "../../../../WalletProvider/lib/src/index"
import WalletConnect from "@walletconnect/web3-provider";
import Portis from "@portis/web3"
import WalletLink from 'walletlink'

class WalletProviderCore  {

    isConnected = false;
    hasInit = false
    provider = null;
    _walletProvider = null;
    _vue = null;

    //initiate web3
    async initialize(){

         this._vue = window._vue_app;

        if(this.hasInit){

        }

        let infuraId = networkConfig.infura_id;

        let providerOpts = {

            portis: {
                package: Portis,
                connect_text: this._vue.$t("portis_connect_text"),
                options: {
                    dappId: networkConfig.portis_id,
                    network: defaultNetworkId
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
                        chainId: 0x2a
                    }
                }
            },
        }

        this._walletProvider = new WalletProvider({
            debug: true,
            cacheProvider: false,
            showLoader: true,
            providers: providerOpts
        })

        //lets check if there is  cache, lets connect with the cache 
        //but fail silently
        //if(this._walletProvider.isProviderCached()){
           //this.connectWallet(true)
        //}

        /**
         * lets listen to wallet connection events
         */
        window.addEventListener("connect_wallet",()=>{
            this.connectWallet(false)
        })
    } //ebd fun 
    
    /**
     * connectWallet
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

        window.swal("Booommm Helllooo")
        //lets check if the chainId we needed  is same as returned
        if(this.isChainSupported(info.chainId)){
            if(!isSilentMode){ 
               
            }

            return false;
        }

        if(!isSilentMode){ this._vue.successNotif(this._vue.$t("wallet_connected")) }
        
    } //end 

    /**
     * isChainSupported
     * @param chainId int
     * @param networkId int
     */
    isChainSupported(chainId){

        if(chainId == null){
            return  Status.error("unsupported_chain"); 
        }

        //web3 networks 
        let web3Networks = networkConfig.networks || {};

        console.log(web3Networks)

        return Status.success()
    } //end fun


}

export default WalletProviderCore;