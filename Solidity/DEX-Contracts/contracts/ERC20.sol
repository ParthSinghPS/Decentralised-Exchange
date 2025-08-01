// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity>=0.5.0;

import "./interfaces/IDexERC20.sol";
import "./libraries/SafeMath.sol";

contract DexERC20 is IDexERC20{
    using SafeMath for uint;
    string public constant name = "DEX_Token";
    string public constant symbol = "Dex-T";
    uint8 public constant decimals = 18;
    uint public totalSupply;

    mapping (address => uint) balanceOf;
    mapping (address => mapping(address => uint)) public allowance;

    bytes32 public Domain_Separator;
    mapping(address => uint) nonces;

    event Approval(address indexed owner , address  indexed spender , uint value);
    event Transfer(address indexed from , address indexed to , uint value);

    constructor() public {
        uint chainId;
        assembly {
            chainId:= chainId;
        }
        Domain_Separator = keccak256(abi.encode(keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")),
        keccak256(bytes(name)),
        keccak256(bytes("1")),
        chainId,
        address(this)
        
        );
    }

}