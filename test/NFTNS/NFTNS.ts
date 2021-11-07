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
      this.erc20 = <MockERC20>await waffle.deployContract(this.signers.admin, ERC20Artifact, []);

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

    it("Should predict the address and deploy to it", async function () {
      await this.nftns.connect(this.signers.admin);

      // mint NFT to signer
      await this.erc721.awardItem(await this.signers.admin.getAddress(), "tokenURI");

      // check that the admin received the first token
      const tokenId = 1;
      expect(await this.erc721.ownerOf(tokenId)).to.be.equal(await this.signers.admin.getAddress());

      // get the precomputed address
      const preComputedAddress = await this.nftns.getWalletAddress(this.erc721.address, tokenId);

      // deploy a wallet
      await expect(this.nftns.connect(this.signers.admin).deployWallet(this.erc721.address, tokenId))
        .to.emit(this.nftns, "NewWallet")
        .withArgs(preComputedAddress, this.erc721.address, tokenId);
    });

    // shouldHandleEth();
    // shouldHandleTokens();
    // shouldHandleNFTs();
  });
});
