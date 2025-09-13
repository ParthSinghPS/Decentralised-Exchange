// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.5.0;

interface IFactory {
    event PairCreated(address indexed token0 , address indexed token1 , address pair , uint);

    function createPair(address token0 , address token1) external returns(address pair);
    function getPair(address token0 , address token1) external view returns(address pair);
    function allPairs(uint) external view returns(address pair);
    function allPairsLength() external view returns(uint);
}