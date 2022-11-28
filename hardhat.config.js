/** @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config();
require("solidity-coverage");
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "localhost",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`${process.env.ACCOUNT_PRIVATE_KEY}`],
    },
    "truffle-dashboard": {
      url: "http://localhost:24012/rpc",
    },
  },
};
