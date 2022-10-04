/** @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require("solidity-coverage");

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "localhost",
  networks: {
    hardhat: {},
    // goerli: {
    //   url: process.env.API_URL,
    //   accounts: [`0x${process.env.PRIVATE_KEY}`]
    // }
  },
};
