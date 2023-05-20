const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  mocha: {},
  compilers: {
    solc: {
      version: '0.8.16'
    }
  },
  networks: {
    inf_EtherCommerce_goerli: {
      network_id: 5,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\memo_\\OneDrive\\Masaüstü\\Ether-Commerce\\EtherCommerce.env', 'utf-8'), "https://goerli.infura.io/v3/5c57f2cf03654f46a0eaa7d6f7b0e20f")
    },
    loc_development_development: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1"
    },
    inf_EtherCommerce_sepolia: {
      network_id: 11155111,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\memo_\\OneDrive\\Masaüstü\\Ether-Commerce\\ethercommerce.env', 'utf-8'), "https://sepolia.infura.io/v3/5c57f2cf03654f46a0eaa7d6f7b0e20f")
    }
  }
};
