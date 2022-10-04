const { ethers } = require("hardhat");
async function main() {
  const ATNFT = await ethers.getContractFactory("ATNFT");
  const deployedATNFT = await ATNFT.deploy();
  console.log("deployedATNFT>>", deployedATNFT.address);

  const Testing = await ethers.getContractFactory("Testing");
  const deployedTesting = await Testing.deploy(deployedATNFT.address);
  console.log("deployedTesting>>", deployedTesting.address);
}

main()
  .then(() => {
    process.exit(1);
  })
  .catch((e) => {
    console.log(e);
    process.exit(0);
  });
//   deployedATNFT>> 0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44
//   deployedTesting>> 0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f
