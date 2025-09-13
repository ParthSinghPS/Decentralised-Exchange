// SPDX-License-Identifier: MIT
pragma solidity>=0.5.0;

import "./interfaces/IDexERC20.sol";
import "./libraries/SafeMath.sol";

contract DexERC20 is IDexERC20{
    using SafeMath for uint;
    string public constant override name = "DEX_Token";
    string public constant override  symbol = "Dex-T";
    uint8 public constant override  decimals = 18;
    bytes32 public constant PERMIT_TYPEHASH = keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    uint public override totalSupply;

    mapping (address => uint) public override balanceOf;
    mapping (address => mapping(address => uint)) public override allowance;

    bytes32 public  DOMAIN_SEPARATOR;
    mapping(address => uint) public override nonces;

    constructor() {
        uint chainId;
        assembly {
            chainId := chainid()
        }
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }

    function _mint(address from , uint value) internal {
        totalSupply += value;
        balanceOf[from] += value;
        emit Transfer(address(0) , from , value);
    }

    function _burn(address from , uint value) internal {
        require(balanceOf[from]>= value , "Insufficient balance");
        totalSupply -= value;
        balanceOf[from] -= value;
        emit Transfer(from , address(0) , value);
    }

    function _approve(address owner , address spender , uint value) internal {
        allowance[owner][spender] = value;
        emit Approval(owner , spender , value);
    }

    function _transfer(address from , address to , uint value) internal {
        balanceOf[from] -= value;
        balanceOf[to] += value;
        emit Transfer(from , to , value);
    }

    function approve(address spender , uint value) external override returns (bool) {
        _approve(msg.sender , spender , value);
        return true;
    }

    function transfer( address to , uint value) external override returns (bool) {
        _transfer(msg.sender , to , value);
        return true;
    }
    
    function transferFrom(address from, address to, uint value) external override returns (bool) {
        require(allowance[from][msg.sender] >= value, "ERC20: transfer amount exceeds allowance");
        allowance[from][msg.sender] -= value;
        _transfer(from, to, value);
        return true;
    }

    function permit(address owner , address spender , uint value , uint deadline , uint8 v , bytes32 r , bytes32 s) external override {
        require(deadline>= block.timestamp , "Date exceeded");
        bytes32 seed = keccak256(abi.encodePacked('\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))));
        address recoveredAddress = ecrecover(seed , v ,r , s);
        require(recoveredAddress == owner , "Invalid signature");
        _approve(owner , spender , value);
    }
}