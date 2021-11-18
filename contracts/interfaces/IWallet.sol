// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

interface IWallet {
    function initialize(
        address contractFactory,
        address contractAddress,
        uint256 tokenId
    ) external payable;

    receive() external payable;
}
