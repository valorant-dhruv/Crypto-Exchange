const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
let mnemonic =
  "misery drum vicious prosper engine arctic raccoon other script anger there nice";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    // develop: {
    //   port: 7545,
    // },
    goerli: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          "https://goerli.infura.io/v3/40013e8122f34b3ea56d347c05228698"
        );
      },
      network_id: "5",
    },
    compilers: {
      solc: {
        version: "0.6.0", // Fetch exact version from solc-bin (default: truffle's version)
      },
    },
  },
};
