import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import type { Wallet } from "../../types/Wallet";
import type { NFTSFactory } from "../../types/NFTSFactory";

import type { MockERC20 } from "../../types/MockERC20";
import type { MockERC721 } from "../../types/MockERC721";

import { Signers } from "../types";
import { expect } from "chai";

// import { shouldBehaveLikeGreeter } from "./Greeter.behavior";
import { shouldBehaveLikeNFTNS } from "./NFTNS.behavior";
import { shouldHandleTokens } from "./ERC20.behavior";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
  });

  describe("Greeter", function () {
    beforeEach(async function () {
      // Deploy ERC721
      const ERC721Artifact: Artifact = await artifacts.readArtifact("MockERC721");
      this.erc721 = <MockERC721>await waffle.deployContract(this.signers.admin, ERC721Artifact, []);

      // Deploy ERC20
      const ERC20Artifact: Artifact = await artifacts.readArtifact("MockERC20");
      this.erc20Supply = 1000;
      this.erc20 = <MockERC20>await waffle.deployContract(this.signers.admin, ERC20Artifact, [this.erc20Supply]);

      // Deploy Wallet implementation
      const walletPrototypeArtifact: Artifact = await artifacts.readArtifact("Wallet");

      // Deploy NFTS Factory
      const factoryArtifact: Artifact = await artifacts.readArtifact("NFTSFactory");

      const walletPrototypeInstance = <Wallet>(
        await waffle.deployContract(this.signers.admin, walletPrototypeArtifact, [])
      );
      this.nftns = <NFTSFactory>(
        await waffle.deployContract(this.signers.admin, factoryArtifact, [walletPrototypeInstance.address])
      );
    });

    shouldBehaveLikeNFTNS();
    shouldHandleTokens();

    // shouldHandleEth();
    // shouldHandleNFTs();
  });
});
