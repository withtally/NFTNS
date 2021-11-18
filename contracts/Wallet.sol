// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./ConvenienceFuncs.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@gnosis.pm/safe-contracts/contracts/base/Executor.sol";
import "@gnosis.pm/safe-contracts/contracts/common/Enum.sol";

import { IContractFactory } from "./interfaces/IContractFactory.sol";

contract Wallet is Executor, ConvenienceFuncs, ReentrancyGuard {
    using Address for address;

    bytes4 public constant ERC721_RECEIVED = 0x150b7a02;

    // todo: add version

    IContractFactory public contractFactory;
    address public selfContractAddress;
    uint256 public selfTokenId;

    event CallExecuted(address indexed target, uint256 value, bytes data, Enum.Operation operation, uint256 gas);

    modifier onlyTokenHolder() {
        require(msg.sender == IERC721(selfContractAddress).ownerOf(selfTokenId), "NFTNS: Caller is not token holder");
        _;
    }

    // todo: self destruct for users who wish to completely reset this contract

    /**
     * @dev This should be called at deployment to initialize the contract
     * @param _contractFactory the contract factory which deployed this contract
     * @param _contractAddress the NFT contract address for which this refers to
     * @param _tokenId the tokenId of the NFT which owns this contract
     */
    function initialize(
        IContractFactory _contractFactory,
        address _contractAddress,
        uint256 _tokenId
    ) external payable {
        contractFactory = _contractFactory;
        selfContractAddress = _contractAddress;
        selfTokenId = _tokenId;
    }

    /**
     * @dev Call any external function as this wallet
     * @param target contract address
     * @param value to forward (IE: ETH)
     * @param data to send as calldata
     */
    function call(
        address target,
        uint256 value,
        bytes calldata data,
        Enum.Operation operation,
        uint256 txGas
    ) public payable onlyTokenHolder nonReentrant {
        require(execute(target, value, data, operation, txGas), "NFTNS::WALLET: tx failed to execute");
        emit CallExecuted(target, value, data, operation, txGas);
    }

    /**
     * @dev Convenience function so users can send ETH via Etherscan
     * @param recipient of the funds
     * @param amount how much to send
     */
    function sendEth(address recipient, uint256 amount) public onlyTokenHolder nonReentrant {
        _sendEth(recipient, amount);
    }

    /**
     * @dev Convenience function so users can send ERC20 tokens via Etherscan
     * @param token contract address
     * @param recipient who receives the tokens
     * @param amount of tokens to send
     */
    function sendERC20(
        IERC20 token,
        address recipient,
        uint256 amount
    ) public onlyTokenHolder nonReentrant {
        _sendERC20(token, recipient, amount);
    }

    /**
     * @dev Convenience function so users can send ERC721 tokens via Etherscan
     * @param token contract address
     * @param recipient who receives the token
     * @param tokenId to send to recipient
     */
    function sendERC721(
        IERC721 token,
        address recipient,
        uint256 tokenId
    ) public onlyTokenHolder nonReentrant {
        _sendERC721(token, recipient, tokenId);
    }

    // todo: add convenience functions

    /**
     * @dev Required in order to receive ERC721 tokens with safeTrasnfer
     */
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) public pure returns (bytes4) {
        return ERC721_RECEIVED;
    }

    // This function is called for plain Ether transfers, i.e.
    // for every call with empty calldata.
    receive() external payable {}
}
