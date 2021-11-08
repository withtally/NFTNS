// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

interface IContractFactory {
    function getSalt(address contractAddress, uint256 tokenId) external returns (bytes32);
}

contract Wallet is ReentrancyGuard {
    using Address for address;

    bytes4 public constant ERC721_RECEIVED = 0x150b7a02;

    // todo: add version

    IContractFactory public contractFactory;
    address public contractAddress;
    uint256 public tokenId;

    event CallExecuted(address indexed target, uint256 value, bytes data);
    event ERC20Transfered(address indexed token, address indexed recipient, uint256 amount);
    event ERC721Transfered(address indexed token, address indexed recipient, uint256 amount);
    event ETHTransfered(address indexed recipient, uint256 amount);

    modifier onlyTokenHolder() {
        require(msg.sender == IERC721(contractAddress).ownerOf(tokenId), "NFTNS: Caller is not token holder");
        _;
    }

    // todo: Double check that I can send value in this call, and have it forwarded
    // todo: convenience function for sending ETH to EOA?
    // todo: convenience function for sending tokens/NFTS (so it can be done via etherscan)
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
        contractAddress = _contractAddress;
        tokenId = _tokenId;
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
        bytes calldata data
    ) public payable onlyTokenHolder nonReentrant {
        _call(target, value, data);
    }

    /**
     * @dev Convenience function so users can send ETH via Etherscan
     * @param recipient of the funds
     * @param amount how much to send
     */
    function sendEth(address recipient, uint256 amount) public onlyTokenHolder nonReentrant {
        // todo: OZ sendValue is not working for some reason
        // recipient.sendValue(amount);
        emit ETHTransfered(recipient, amount);
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
        token.transfer(recipient, amount);
        emit ERC20Transfered(address(token), recipient, amount);
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
        token.transferFrom(address(this), recipient, tokenId);
        emit ERC721Transfered(address(token), recipient, tokenId);
    }

    /**
     * @dev Call any external function as this wallet (internal function)
     * @param target contract address
     * @param value to forward (IE: ETH)
     * @param data to send as calldata
     */
    function _call(
        address target,
        uint256 value,
        bytes calldata data
    ) private {
        (bool success, ) = target.call{ value: value }(data);
        require(success, "NFTNS Wallet: underlying transaction reverted");
        emit CallExecuted(target, value, data);
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
    ) public returns (bytes4) {
        return ERC721_RECEIVED;
    }

    // This function is called for plain Ether transfers, i.e.
    // for every call with empty calldata.
    receive() external payable {}
}
