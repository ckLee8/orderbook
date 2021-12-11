const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const MatchingMarket = await hre.ethers.getContractFactory("MatchingMarket");
  const matchingMarket = await MatchingMarket.deploy();

  await matchingMarket.deployed();

  console.log("MatchingMarket deployed to:", matchingMarket.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });