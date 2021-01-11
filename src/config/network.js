export default {

   default_network: "kovan", 
   
   infura_id: "b5ef34114e4747759f1cce670f02b2b7",
   
   portis_id: "ef4d122b-7887-44a4-9476-58a27c44f1e5",

   networks: {
       "eth_mainnet": {
           name: "mainnet",
           type: "mainnet",
           chain: "ETH",
           symbol: "ETH",
           chain_id: 0x1,
           supported: true,
           enabled: false
       },

       "kovan": {
            name: "kovan",
            type: "testnet",
            chain: "ETH",
            symbol: "KOV",
            chain_id: 0x2a,
            supported: true,
            enabled: true,
            contractAddress: "0x21fE2Fdc1CDE8FEA31338E75562Ab8678cece8cB",
            rpc: [
                "https://kovan.infura.io/v3/b5ef34114e4747759f1cce670f02b2b7"
            ]
        }
   }
}