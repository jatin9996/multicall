import ("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    compilers: [
      { version: "0.5.5" }, 
      { version: "0.6.6" },
      { version: "0.8.20"},
      { version: "0.7.0" },
      { version: "0.8.0" }, 
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://bsc-dataseed.bnbchain.org",
        chainid: 56,
      },
    },
    testnet: {
      url: "https://bsc-testnet-dataseed.bnbchain.org",
      chainId: 97,
      accounts: [
        "3c59b6e57666200edfe2aa4336d32ccb1b663042dff2a402bb148cb117463c48"
      ],
    },
    mainnet: {
      url: "https://bsc-dataseed.bnbchain.org",
      chainId: 56,
      accounts:[
        "3c59b6e57666200edfe2aa4336d32ccb1b663042dff2a402bb148cb117463c48"
      ],
    }
  },
};
