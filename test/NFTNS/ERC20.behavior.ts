import { expect } from "chai";
import { ethers, artifacts } from "hardhat";
import type { Artifact } from "hardhat/types";

import type { Wallet } from "../../types/Wallet";

export function shouldHandleTokens(): void {
  it("should send and receive ERC20 tokens using convenience function", async function () {
    await this.erc20.connect(this.signers.admin);
    await this.nftns.connect(this.signers.admin);

    // mint NFT to signer
    await this.erc721.awardItem(await this.signers.admin.getAddress(), "tokenURI");

    // check that the admin received the first token
    const tokenId = 1;
    expect(await this.erc721.ownerOf(tokenId)).to.be.equal(await this.signers.admin.getAddress());

    // get address of wallet
    const preComputedAddress = await this.nftns.getWalletAddress(this.erc721.address, tokenId);

    // check balance, expect it to be 1000
    expect(await this.erc20.balanceOf(await this.signers.admin.getAddress())).to.equal(this.erc20Supply);

    // send tokens to NFTNS Wallet
    await this.erc20.transfer(preComputedAddress, this.erc20Supply);

    // check balance of adming, expect to be zero
    expect(await this.erc20.balanceOf(await this.signers.admin.getAddress())).to.equal(0);

    // check balance of NFTNS wallet, expect to be 1000
    expect(await this.erc20.balanceOf(preComputedAddress)).to.equal(this.erc20Supply);

    // deploy wallet
    await expect(this.nftns.deployWallet(this.erc721.address, tokenId))
      .to.emit(this.nftns, "NewWallet")
      .withArgs(preComputedAddress, this.erc721.address, tokenId);

    // create a wallet instanec
    const WalletArtifact: Artifact = await artifacts.readArtifact("Wallet");
    const wallet = new ethers.Contract(preComputedAddress, WalletArtifact.abi, this.signers.admin) as Wallet;

    // transfer tokens back to admin
    await expect(wallet.sendERC20(this.erc20.address, await this.signers.admin.getAddress(), this.erc20Supply)).to.be
      .not.reverted;

    // check admin has tokens
    expect(await this.erc20.balanceOf(await this.signers.admin.getAddress())).to.equal(this.erc20Supply);

    // check wallet has no tokens
    expect(await this.erc20.balanceOf(preComputedAddress)).to.equal(0);
  });
}
