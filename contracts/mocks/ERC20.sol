// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor(uint256 supply) ERC20("Fixed", "FIX") {
        _mint(msg.sender, supply);
    }
}
