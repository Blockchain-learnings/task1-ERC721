/** @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config();
require("solidity-coverage");
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "localhost",
  networks: {
    hardhat: {},
  },
};
