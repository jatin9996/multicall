const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const initialOwnerAddress = "0x7684610D8Fc600F11924906bb1a987e9491a26a1";
  const PANCAKE_FACTORY = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
  const PANCAKE_ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
  const SUSHI_FACTORY = "0xc35DADB65012eC5796536bD9864eD8773aBc74C4";
  const SUSHI_ROUTER = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";

  console.log("Deploying contracts with the account:", deployer.address); 

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const PancakeSushi = await ethers.getContractFactory("PancakeSushi");
  const pancakeSushi = await PancakeSushi.deploy(PANCAKE_FACTORY,PANCAKE_ROUTER,SUSHI_ROUTER,SUSHI_FACTORY);

  await pancakeSushi.deployed();

  console.log("PancakeSushi address:", pancakeSushi.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
