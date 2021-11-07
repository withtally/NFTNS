/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { GameItem, GameItemInterface } from "../GameItem";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "awardItem",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604080518082018252600881526747616d654974656d60c01b60208083019182528351808501909452600384526249544d60e81b9084015281519192916200005d916000916200007c565b508051620000739060019060208401906200007c565b5050506200015f565b8280546200008a9062000122565b90600052602060002090601f016020900481019282620000ae5760008555620000f9565b82601f10620000c957805160ff1916838001178555620000f9565b82800160010185558215620000f9579182015b82811115620000f9578251825591602001919060010190620000dc565b50620001079291506200010b565b5090565b5b808211156200010757600081556001016200010c565b600181811c908216806200013757607f821691505b602082108114156200015957634e487b7160e01b600052602260045260246000fd5b50919050565b611849806200016f6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806370a082311161008c578063b88d4fde11610066578063b88d4fde146101e1578063c87b56dd146101f4578063cf37834314610207578063e985e9c51461021a57600080fd5b806370a08231146101a557806395d89b41146101c6578063a22cb465146101ce57600080fd5b8063095ea7b3116100c8578063095ea7b31461015757806323b872dd1461016c57806342842e0e1461017f5780636352211e1461019257600080fd5b806301ffc9a7146100ef57806306fdde0314610117578063081812fc1461012c575b600080fd5b6101026100fd3660046113ae565b610256565b60405190151581526020015b60405180910390f35b61011f6102a8565b60405161010e9190611423565b61013f61013a366004611436565b61033a565b6040516001600160a01b03909116815260200161010e565b61016a61016536600461146b565b6103d4565b005b61016a61017a366004611495565b6104ea565b61016a61018d366004611495565b610571565b61013f6101a0366004611436565b61058c565b6101b86101b33660046114d1565b610617565b60405190815260200161010e565b61011f6106b1565b61016a6101dc3660046114ec565b6106c0565b61016a6101ef3660046115b4565b610785565b61011f610202366004611436565b610813565b6101b8610215366004611630565b6109a6565b610102610228366004611692565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061028757506001600160e01b03198216635b5e139f60e01b145b806102a257506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102b7906116c5565b80601f01602080910402602001604051908101604052809291908181526020018280546102e3906116c5565b80156103305780601f1061030557610100808354040283529160200191610330565b820191906000526020600020905b81548152906001019060200180831161031357829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166103b85760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006103df8261058c565b9050806001600160a01b0316836001600160a01b0316141561044d5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016103af565b336001600160a01b038216148061046957506104698133610228565b6104db5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016103af565b6104e583836109de565b505050565b6104f43382610a59565b6105665760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f76656400000000000000000000000000000060648201526084016103af565b6104e5838383610b4c565b6104e583838360405180602001604052806000815250610785565b6000818152600260205260408120546001600160a01b0316806102a25760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e000000000000000000000000000000000000000000000060648201526084016103af565b60006001600160a01b0382166106955760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f20616464726573730000000000000000000000000000000000000000000060648201526084016103af565b506001600160a01b031660009081526003602052604090205490565b6060600180546102b7906116c5565b6001600160a01b0382163314156107195760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103af565b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b61078f3383610a59565b6108015760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f76656400000000000000000000000000000060648201526084016103af565b61080d84848484610d0d565b50505050565b6000818152600260205260409020546060906001600160a01b03166108a05760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f722060448201527f6e6f6e6578697374656e7420746f6b656e00000000000000000000000000000060648201526084016103af565b600082815260066020526040812080546108b9906116c5565b80601f01602080910402602001604051908101604052809291908181526020018280546108e5906116c5565b80156109325780601f1061090757610100808354040283529160200191610932565b820191906000526020600020905b81548152906001019060200180831161091557829003601f168201915b50505050509050600061095060408051602081019091526000815290565b9050805160001415610963575092915050565b81511561099557808260405160200161097d929190611700565b60405160208183030381529060405292505050919050565b61099e84610d96565b949350505050565b60006109b6600780546001019055565b60006109c160075490565b90506109cd8482610e8b565b6109d78184610fda565b9392505050565b6000818152600460205260409020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0384169081179091558190610a208261058c565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b0316610ad25760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016103af565b6000610add8361058c565b9050806001600160a01b0316846001600160a01b03161480610b185750836001600160a01b0316610b0d8461033a565b6001600160a01b0316145b8061099e57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff1661099e565b826001600160a01b0316610b5f8261058c565b6001600160a01b031614610bdb5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201527f73206e6f74206f776e000000000000000000000000000000000000000000000060648201526084016103af565b6001600160a01b038216610c3d5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103af565b610c486000826109de565b6001600160a01b0383166000908152600360205260408120805460019290610c71908490611745565b90915550506001600160a01b0382166000908152600360205260408120805460019290610c9f90849061175c565b9091555050600081815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b610d18848484610b4c565b610d2484848484611083565b61080d5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016103af565b6000818152600260205260409020546060906001600160a01b0316610e235760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e000000000000000000000000000000000060648201526084016103af565b6000610e3a60408051602081019091526000815290565b90506000815111610e5a57604051806020016040528060008152506109d7565b80610e64846111e6565b604051602001610e75929190611700565b6040516020818303038152906040529392505050565b6001600160a01b038216610ee15760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103af565b6000818152600260205260409020546001600160a01b031615610f465760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103af565b6001600160a01b0382166000908152600360205260408120805460019290610f6f90849061175c565b9091555050600081815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000828152600260205260409020546001600160a01b03166110645760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201527f6578697374656e7420746f6b656e00000000000000000000000000000000000060648201526084016103af565b600082815260066020908152604090912082516104e5928401906112fc565b60006001600160a01b0384163b156111db57604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906110c7903390899088908890600401611774565b602060405180830381600087803b1580156110e157600080fd5b505af1925050508015611111575060408051601f3d908101601f1916820190925261110e918101906117b0565b60015b6111c1573d80801561113f576040519150601f19603f3d011682016040523d82523d6000602084013e611144565b606091505b5080516111b95760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016103af565b805181602001fd5b6001600160e01b031916630a85bd0160e11b14905061099e565b506001949350505050565b60608161120a5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115611234578061121e816117cd565b915061122d9050600a836117fe565b915061120e565b60008167ffffffffffffffff81111561124f5761124f611528565b6040519080825280601f01601f191660200182016040528015611279576020820181803683370190505b5090505b841561099e5761128e600183611745565b915061129b600a86611812565b6112a690603061175c565b60f81b8183815181106112bb576112bb611826565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506112f5600a866117fe565b945061127d565b828054611308906116c5565b90600052602060002090601f01602090048101928261132a5760008555611370565b82601f1061134357805160ff1916838001178555611370565b82800160010185558215611370579182015b82811115611370578251825591602001919060010190611355565b5061137c929150611380565b5090565b5b8082111561137c5760008155600101611381565b6001600160e01b0319811681146113ab57600080fd5b50565b6000602082840312156113c057600080fd5b81356109d781611395565b60005b838110156113e65781810151838201526020016113ce565b8381111561080d5750506000910152565b6000815180845261140f8160208601602086016113cb565b601f01601f19169290920160200192915050565b6020815260006109d760208301846113f7565b60006020828403121561144857600080fd5b5035919050565b80356001600160a01b038116811461146657600080fd5b919050565b6000806040838503121561147e57600080fd5b6114878361144f565b946020939093013593505050565b6000806000606084860312156114aa57600080fd5b6114b38461144f565b92506114c16020850161144f565b9150604084013590509250925092565b6000602082840312156114e357600080fd5b6109d78261144f565b600080604083850312156114ff57600080fd5b6115088361144f565b91506020830135801515811461151d57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561155957611559611528565b604051601f8501601f19908116603f0116810190828211818310171561158157611581611528565b8160405280935085815286868601111561159a57600080fd5b858560208301376000602087830101525050509392505050565b600080600080608085870312156115ca57600080fd5b6115d38561144f565b93506115e16020860161144f565b925060408501359150606085013567ffffffffffffffff81111561160457600080fd5b8501601f8101871361161557600080fd5b6116248782356020840161153e565b91505092959194509250565b6000806040838503121561164357600080fd5b61164c8361144f565b9150602083013567ffffffffffffffff81111561166857600080fd5b8301601f8101851361167957600080fd5b6116888582356020840161153e565b9150509250929050565b600080604083850312156116a557600080fd5b6116ae8361144f565b91506116bc6020840161144f565b90509250929050565b600181811c908216806116d957607f821691505b602082108114156116fa57634e487b7160e01b600052602260045260246000fd5b50919050565b600083516117128184602088016113cb565b8351908301906117268183602088016113cb565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b6000828210156117575761175761172f565b500390565b6000821982111561176f5761176f61172f565b500190565b60006001600160a01b038087168352808616602084015250836040830152608060608301526117a660808301846113f7565b9695505050505050565b6000602082840312156117c257600080fd5b81516109d781611395565b60006000198214156117e1576117e161172f565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261180d5761180d6117e8565b500490565b600082611821576118216117e8565b500690565b634e487b7160e01b600052603260045260246000fdfea164736f6c6343000809000a";

type GameItemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GameItemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GameItem__factory extends ContractFactory {
  constructor(...args: GameItemConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<GameItem> {
    return super.deploy(overrides || {}) as Promise<GameItem>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): GameItem {
    return super.attach(address) as GameItem;
  }
  connect(signer: Signer): GameItem__factory {
    return super.connect(signer) as GameItem__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GameItemInterface {
    return new utils.Interface(_abi) as GameItemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GameItem {
    return new Contract(address, _abi, signerOrProvider) as GameItem;
  }
}
