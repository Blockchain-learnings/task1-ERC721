const { ethers } = require("hardhat");
const { appendFileSync } = require("fs");
async function main() {
  const ATNFT = await ethers.getContractFactory("ATNFT");
  const deployedATNFT = await ATNFT.deploy();
  console.log("deployedATNFT address>>", deployedATNFT.address);

  appendFileSync(
    "deploy.json",
    JSON.stringify(
      {
        //Factory: Factoryinst.address,
        ATNFT: deployedATNFT.address,
      },
      null,
      1
    )
  );

  const Testing = await ethers.getContractFactory("Testing");
  const deployedTesting = await Testing.deploy(deployedATNFT.address);
  appendFileSync(
    "deploy.json",
    JSON.stringify(
      {
        //Factory: Factoryinst.address,
        Testing: deployedATNFT.address,
      },
      null,
      1
    )
  );
  console.log("deployedTesting address>>", deployedTesting.address);
}

main()
  .then(() => {
    process.exit(1);
  })
  .catch((e) => {
    console.log(e);
    process.exit(0);
  });
