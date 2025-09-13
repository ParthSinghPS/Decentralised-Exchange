// SPDX-License-Identifier: MIT
pragma solidity>= 0.5.0;

import "./interfaces/IFactory.sol";
import "./Pair.sol";

contract Factory is IFactory {

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }

    function createPair(address tokenA , address tokenB) external returns (address pair) {
        require(tokenA != tokenB , "Identical Addresses!!");
        (address token0 , address token1) = tokenA > tokenB ? (tokenA , tokenB) : (tokenB , tokenA);
        require(token0 != address(0) , "Zero Address");
        require(getPair[token0][token1] == address(0) , "Pair already exists");
        bytes memory bytecode = type(Pair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0 , token1));
        assembly {
            pair := create2(0 , add(bytecode , 32) , mload(bytecode) , salt)
        }
        IPair(pair).initialize(token0 , token1); 
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair;
        allPairs.push(pair);
        emit PairCreated( token0 , token1 , pair , allPairs.length);

    }

}