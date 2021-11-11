// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ConvenienceFuncs {
    event ERC20Transfered(address indexed token, address indexed recipient, uint256 amount);
    event ERC721Transfered(address indexed token, address indexed recipient, uint256 amount);
    event ETHTransfered(address indexed recipient, uint256 amount);

    /**
     * @dev Convenience function so users can send ETH via Etherscan
     * @param recipient of the funds
     * @param amount how much to send
     */
    function _sendEth(address recipient, uint256 amount) internal {
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
    function _sendERC20(
        IERC20 token,
        address recipient,
        uint256 amount
    ) internal {
        token.transfer(recipient, amount);
        emit ERC20Transfered(address(token), recipient, amount);
    }

    /**
     * @dev Convenience function so users can send ERC721 tokens via Etherscan
     * @param token contract address
     * @param recipient who receives the token
     * @param tokenId to send to recipient
     */
    function _sendERC721(
        IERC721 token,
        address recipient,
        uint256 tokenId
    ) internal {
        token.transferFrom(address(this), recipient, tokenId);
        emit ERC721Transfered(address(token), recipient, tokenId);
    }
}
