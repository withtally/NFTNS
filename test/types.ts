import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { Fixture } from "ethereum-waffle";

import type { Wallet } from "../types/Wallet";
import type { NFTSFactory } from "../types/NFTSFactory";

import type { MockERC20 } from "../types/MockERC20";
import type { MockERC721 } from "../types/MockERC721";

declare module "mocha" {
  export interface Context {
    wallet: Wallet;
    nftns: NFTSFactory;
    erc721: MockERC721;
    erc20: MockERC20;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
}
