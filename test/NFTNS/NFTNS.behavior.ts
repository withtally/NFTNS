import { expect } from "chai";

export function shouldBehaveLikeNFTNS(): void {
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

  it("Should not deploy to address if a contract is already there", async function () {
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

    // try to deploy again
    await expect(this.nftns.connect(this.signers.admin).deployWallet(this.erc721.address, tokenId)).to.be.revertedWith(
      "NFTNS: err, contract already exists at this address",
    );
  });
}
