// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

interface IContractFactory {
    function getSalt(address contractAddress, uint256 tokenId) external returns (bytes32);
}
