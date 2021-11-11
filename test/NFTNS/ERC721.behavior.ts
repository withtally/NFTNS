import { expect } from "chai";
import { ethers, artifacts } from "hardhat";
import type { Artifact } from "hardhat/types";

import type { Wallet } from "../../types/Wallet";

// todo: create mock that simulates reentrancy

export function shouldHandleNFTS(): void {
  it("should send and receive ERC721 tokens using convenience function", async function () {
    await this.erc721.connect(this.signers.admin);
    await this.nftns.connect(this.signers.admin);
    await this.mockERC721.connect(this.signers.admin);

    // mint NFT to signer ( to create a wallet with )
    await this.erc721.awardItem(await this.signers.admin.getAddress(), "tokenURI");

    // check that the admin received the first token ( the wallet token )
    const tokenId = 1;
    expect(await this.erc721.ownerOf(tokenId)).to.be.equal(await this.signers.admin.getAddress());

    // get address of wallet
    const preComputedAddress = await this.nftns.getWalletAddress(this.erc721.address, tokenId);

    // check balance of not-yet-deployed wallet, expect it to be 0
    expect(await this.mockERC721.balanceOf(preComputedAddress)).to.equal(0);

    // mint mockNFT to signer (to test receiving an using nfts)
    await this.mockERC721.awardItem(preComputedAddress, "mockNFT");

    // check balance of not-yet-deployed wallet, expect it to be 1
    expect(await this.mockERC721.balanceOf(preComputedAddress)).to.equal(1);

    // deploy wallet
    await expect(this.nftns.deployWallet(this.erc721.address, tokenId))
      .to.emit(this.nftns, "NewWallet")
      .withArgs(preComputedAddress, this.erc721.address, tokenId);

    // create a wallet instance
    const WalletArtifact: Artifact = await artifacts.readArtifact("Wallet");
    const wallet = new ethers.Contract(preComputedAddress, WalletArtifact.abi, this.signers.admin) as Wallet;

    // transfer mockNFT token to admin
    await expect(wallet.sendERC721(this.mockERC721.address, await this.signers.admin.getAddress(), 1)).to.be.not
      .reverted;

    // check admin has tokens
    expect(await this.mockERC721.balanceOf(await this.signers.admin.getAddress())).to.equal(1);

    // check wallet has no nft
    expect(await this.mockERC721.balanceOf(preComputedAddress)).to.equal(0);
  });
}
