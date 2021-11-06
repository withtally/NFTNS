pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contract/token/ERC721/IERC721.sol";

interface IContractFactory {
    function getSalt(address contractAddress, uint256 tokenId) external returns (bytes32);
}

interface I721 {
    function ownerOf(uint256 tokenId) external returns (address owner);
}

contract Wallet {
    using Address for address;

    bytes4 public constant ERC721_RECEIVED = 0x150b7a02;

    // todo: add version

    IContractFactory public contractFactory;
    address public contractAddress;
    uint256 public tokenId;

    event CallExecuted(address indexed target, uint256 value, bytes data);

    modifier onlyTokenHolder() {
        require(msg.sender == I721(contractAddress).ownerOf(tokenId), "NFTNS: Caller is not token holder");
        _;
    }

    function initialize(
        address _contractFactory,
        address _contractAddress,
        uint256 _tokenId
    ) external {
        contractFactory = _contractFactory;
        contractAddress = _contractAddress;
        tokenId = _tokenId;
    }

    // todo: Double check that I can send value in this call, and have it forwarded
    function call(
        address target,
        uint256 value,
        bytes calldata data
    ) public payable onlyTokenHolder {
        _call(target, value, data);
    }

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

    // Support ERC721 SafeTranfers
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) public returns (bytes4) {
        return ERC721_RECEIVED;
    }
}
