pragma solidity ^0.8.6;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

interface IWallet {
    function initialize(
        address contractFactory,
        address contractAddress,
        uint256 tokenId
    ) external payable;

    function receive() external payable;
}

contract NFTSFactory is Ownable {
    using Address for address;
    using Clones for address;

    address public implementation; // TODO: Add ability for DAO to add implementations

    // TODO: have a function that gets this networks CAIP
    // https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md

    string public constant NETWORK_DOMAIN_TYPE = "eip155";

    event NewWallet(address wallet, address indexed contractAddress, uint256 indexed tokenId);
    event NewImplementation(address implementation);

    constructor(address _implementation) {
        implementation = _implementation;
    }

    /**
     * Public Functions
     */

    function deployWallet(address contractAddress, uint256 tokenId) public payable {
        require(
            !getWalletAddress(contractAddress, tokenId).isContract(),
            "NFTNS: err, contract already exists at this address"
        );

        address wallet = implementation.cloneDeterministic(_getSalt(contractAddress, tokenId));

        IWallet(wallet).initialize{ value: msg.value }(address(this), contractAddress, tokenId);

        emit NewWallet(wallet, contractAddress, tokenId);
    }

    /**
     * DAO Functions
     */

    function updateImplementation(address newImplementation) public onlyOwner {
        implementation = newImplementation;
        emit NewImplementation(newImplementation);
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

    function _getSalt(address _contractAddress, uint256 _tokenId) internal view returns (bytes32) {
        return keccak256(abi.encode(NETWORK_DOMAIN_TYPE, ":", getChainId(), _contractAddress, _tokenId));
    }

    function getChainId() private view returns (uint256 chainId) {
        assembly {
            chainId := chainid()
        }
    }

    // TODO: Function to check if wallet exists, version,
}
