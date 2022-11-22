const { expect } = require("chai");
const { BigNumber } = require("ethers");

describe("ERC721 contract", () => {
  let owners, acc1, acc2;
  let erc721Contract,
    deployedContract,
    testingContract,
    testingDeployedContract;
  describe("deployment verifaction", async () => {
    beforeEach(async () => {
      [owners, acc1, acc2] = await ethers.getSigners();
      erc721Contract = await ethers.getContractFactory("ATNFT");
      deployedContract = await erc721Contract.deploy();
      await deployedContract.deployed();

      testingContract = await ethers.getContractFactory("Testing");
      testingDeployedContract = await testingContract.deploy(
        deployedContract.address
      );
      await testingDeployedContract.deployed();
    });

    it("at deployment verify name", async () => {
      const tokenName = await deployedContract.name();
      expect(tokenName).to.equal("Ayush Thakur");
    });
    it("at deployment verify symbol", async () => {
      const tokenSymbol = await deployedContract.symbol();
      expect(tokenSymbol).to.equal("ATNFT");
    });
  });

  describe("mint functionalities", async () => {
    it("should fail if less than 0.5 eth provided", async () => {
      await expect(
        deployedContract.mint("", { value: "1000000000000000" })
      ).to.be.revertedWith("0.5 eth required to mint");
    });

    it("should fail if more than 0.5 eth provided", async () => {
      await expect(
        deployedContract.mint("", { value: "600000000000000000" })
      ).to.be.revertedWith("0.5 eth required to mint");
    });

    it("should pass if 0.5 eth provided", async () => {
      await deployedContract
        .connect(acc2)
        .mint("", { value: "500000000000000000" });
      const balance = await deployedContract.balanceOf(acc2.address);
      await expect(BigNumber.from(balance)).to.equal(1);
    });

    it("should revert when called from contract", async () => {
      await expect(testingDeployedContract.callMint()).to.be.revertedWith(
        "msg.sender not EOW"
      );
    });

    it("list owner's nfts", async () => {
      await deployedContract
        .connect(acc2)
        .mint("", { value: "500000000000000000" });
      const value = await deployedContract.getNFTsForOwner(acc2.address);
      expect(BigNumber.from(value[0])).to.equal(1);
    });
  });
});
