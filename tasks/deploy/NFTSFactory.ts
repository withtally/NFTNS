import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { NFTSFactory, Wallet } from "../../types";
import { Wallet__factory } from "../../types/factories/Wallet__factory";
import { NFTSFactory__factory } from "../../types/factories/NFTSFactory__factory";

task("deploy:NFTS").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const walletFactory: Wallet__factory = await ethers.getContractFactory("Wallet");
  const NFTSFactory: NFTSFactory__factory = await ethers.getContractFactory("NFTSFactory");

  const wallet: Wallet = <Wallet>await walletFactory.deploy();
  await wallet.deployed();

  const implementationAddress = wallet.address;

  const nfts: NFTSFactory = <NFTSFactory>await NFTSFactory.deploy(implementationAddress);
  await nfts.deployed();

  console.log("NFTSFactory deployed to: ", nfts.address);
});
