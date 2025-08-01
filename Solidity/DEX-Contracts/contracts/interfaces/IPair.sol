// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >= 0.5.0;

interface IPair {
    event Approval(address indexed owner , address indexed spender , uint value);
    event Transfer( address indexed from , address indexed to , uint value);

    function name() external view returns(string memory);
    function symbol() external view returns(string memory);
    function decimals() external view returns(uint8);
    function totalSupply() external view returns(uint );
    function balanceOf(address owner) external view returns(uint);
    function allowance( address owner , address spender) external view returns(uint);

    function approve(address spender , uint value) external returns(bool);
    function transfer(address owner , uint amount) external returns(bool);
    function transferFrom(address from , address to , uint value) external returns(bool);

    function Domain_Separator() external view returns(bytes32);
    function Permit_Typehash() external pure returns(bytes32);
    function nonces(address owner) external view returns(uint);

    function permit(address owner , address spender , uint value , uint deadline , uint8 v , bytes32 r , bytes32 s) external;

    event Mint(address indexed sender, uint amount0 , uint amount1);
    event Burn(address indexed sender , uint amount0 , uint amount1 , address indexed to);
    event Swap(address indexed sender , uint amount0In , uint amount1In, uint amount0Out , uint amount1Out , address indexed to);
    event Sync(uint reserve1 , uint reserve2);

    function initialize(address , address) external;

    function mint(address to) external returns(uint liquidity);
    function burn(address to) external returns(uint amount0 , uint amount1);
    function swap(uint amount0Out , uint amount1Out , address to , bytes calldata data) external;

    function getReserves() external view returns(uint reserve1 , uint reserve2 , uint blockLastTimestamp);

    function sync() external;

    function skim(address to) external;

    function price0CumulativeLast() external view returns(uint);
    function price1CumulativeLast() external view returns(uint);

    function Min_Liquidity() external pure returns(uint);

}