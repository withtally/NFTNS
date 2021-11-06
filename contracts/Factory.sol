pragma solidity ^0.8.6;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

interface IWallet {
    function initialize(
        address contractFactory,
        address contractAddress,
        uint256 tokenId
    ) external;
}

contract CloneFactory is Ownable {
    using Address for address;
    using Clones for address;

    address public implementation; // TODO: Add ability for DAO to add implementations

    event NewWallet(address wallet, address indexed contractAddress, address indexed tokenId);

    /**
     * Public Functions
     */

    function deployWallet(address contractAddress, uint256 tokenId) public payable {
        address wallet = implementation.cloneDeterministic(_getSalt(contractAddress, tokenId));

        IWallet(wallet).initialize(address(this), contractAddress, tokenId);

        // transfer value to the wallet
        wallet.sendValue(wallet, msg.value);
        emit NewWallet(wallet, contractAddress, tokenId);
    }

    /**
     * Calculate a NFT's wallet address
     *
     */
    function getWalletAddress(address contractAddress, uint256 tokenId) public view returns (address predictedAddress) {
        return implementation.predictDeterministicAddress(_getSalt(contractAddress, tokenId));
    }

    /**
     * Private Functions
     */

    function _getSalt(address _contractAddress, uint256 _tokenId) internal pure returns (bytes32) {
        return keccak256(abi.encode(_contractAddress, _tokenId));
    }

    // TODO: Function to check if wallet exists, version,
}
