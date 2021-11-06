# NFTNS

A TallyLabs project

NFTNS solves the problem of:

"How do I sent Eth/Tokens/NFTs to an NFT?"

The idea here is that an NFT (for example a Punk, or a Bored Ape) is the destination itself, not nessesarilly the Ethereum address that owns this NFT.

Use cases:
I want to send tokens to Punk#4256
I want to BoredApe#9243 to be included in my whitelist
I want to _do something_ with DopeWars#5323

In all these cases you could use `tokenContract.ownerOf(tokenId)`, but that resolves to an actual address. If for example I want to inlcude BoredApe#9243 in my white list, the holder of the Ape might sell the Ape and still claim their spot in my whitelist.

This is a nascent solution that allows any NFT to resolve to a definitive address that is owned and controlled only by the token holder.

# Why not ENS?

I love ENS, but I don't see how it would practically work in this example. Using ENS requires that I setup some kind of Resolver or register a domain or subdomain for my contract. The solution here works for _any_ ERC721 compatible NFT (Todo: add adaptor for Punks, cryptoKitties and EtherRocks) regardless of whether or not the holder or contract owner has done any work to setup a resolver first.

# Counterfactual Baby!

In this design we map all possible ERC721 comptaible tokens to a counterfactually deployed "wallet". This wallet is the owner of a single ERC721 token, and thus can receive ERC20 tokens, ETH, and be included in any whitelists, even if it's not yet deployed! This wallet is effectively the "wallet of the NFT" but is operated by the NFT caretaker, the current NFT holder. The ability to operate the wallet is gated at whether or not the caller is the current token holder.

This opens up a ton of exciting possiblities and in many ways builds upon work I (Dennison Bertram) did with some friends in 2016 at EthBuenosAires when we built (and won!) a hackathon for Kittygram- a system for making CryptoKitties soverign owners of data (other NFTS).

# Whats Next

This is a placeholder for future development but you can (maybe) expect:

- Javascript helper for easilly resolving NFTNS wallet addresses
- Messanging: Send a message to an NFT!
- Off Chain registry for data (think: host a website at doodle#4253!)
- and more!

❤️ Dennison Bertram @ Tally. www.withTally.com

# Solidity Template

My favorite setup for writing Solidity smart contracts.

- [Hardhat](https://github.com/nomiclabs/hardhat): compile and run the smart contracts on a local development network
- [TypeChain](https://github.com/ethereum-ts/TypeChain): generate TypeScript types for smart contracts
- [Ethers](https://github.com/ethers-io/ethers.js/): renowned Ethereum library and wallet implementation
- [Waffle](https://github.com/EthWorks/Waffle): tooling for writing comprehensive smart contract tests
- [Solhint](https://github.com/protofire/solhint): linter
- [Solcover](https://github.com/sc-forks/solidity-coverage): code coverage
- [Prettier Plugin Solidity](https://github.com/prettier-solidity/prettier-plugin-solidity): code formatter

This is a GitHub template, which means you can reuse it as many times as you want. You can do that by clicking the "Use this
template" button at the top of the page.

## Usage

### Pre Requisites

Before running any command, you need to create a `.env` file and set a BIP-39 compatible mnemonic as an environment
variable. Follow the example in `.env.example`. If you don't already have a mnemonic, use this [website](https://iancoleman.io/bip39/) to generate one.

Then, proceed with installing dependencies:

```sh
yarn install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ yarn compile
```

### TypeChain

Compile the smart contracts and generate TypeChain artifacts:

```sh
$ yarn typechain
```

### Lint Solidity

Lint the Solidity code:

```sh
$ yarn lint:sol
```

### Lint TypeScript

Lint the TypeScript code:

```sh
$ yarn lint:ts
```

### Test

Run the Mocha tests:

```sh
$ yarn test
```

### Coverage

Generate the code coverage report:

```sh
$ yarn coverage
```

### Report Gas

See the gas usage per unit test and average gas per method call:

```sh
$ REPORT_GAS=true yarn test
```

### Clean

Delete the smart contract artifacts, the coverage reports and the Hardhat cache:

```sh
$ yarn clean
```

### Deploy

Deploy the contracts to Hardhat Network:

```sh
$ yarn deploy --greeting "Bonjour, le monde!"
```

## Syntax Highlighting

If you use VSCode, you can enjoy syntax highlighting for your Solidity code via the
[vscode-solidity](https://github.com/juanfranblanco/vscode-solidity) extension. The recommended approach to set the
compiler version is to add the following fields to your VSCode user settings:

```json
{
  "solidity.compileUsingRemoteVersion": "v0.8.4+commit.c7e474f2",
  "solidity.defaultCompiler": "remote"
}
```

Where of course `v0.8.4+commit.c7e474f2` can be replaced with any other version.
