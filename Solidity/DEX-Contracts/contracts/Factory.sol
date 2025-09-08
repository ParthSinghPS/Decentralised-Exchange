// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity>= 0.5.0;

import "./interfaces/IFactory.sol";
import "./Pair.sol";

contract Factory is IFactory {

    address public feeTo;
    address public feeToSetter;

    mapping(address => mapping(adderss => address)) public getPair;
    address[] public allPairs;

    event PairCreated(address indexed token0 , address indexed token1 , address pair , uint );

    constructor(address _feeToSetter) {
        feeToSetter = _feeToSetter;
    }

    function allPairsLength() external view returns (uint) {
        return allPairs.Length;
    }

    function createPair(address tokenA , address tokenB) external returns (address pair) {
        require(tokenA != tokenB , "Identical Addresses!!");
        (address token0 , address token1) = tokenA > tokenB ? (token0 , token1) : (token1 , token0);
        require(token0 != address(0) , "Zero Address");
        require(getPair[token0][token1] == address(0) , "Pair already exists");
        bytes memory bytecode = type(PairContract).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0 , token1));
        assembly {
            pair := create2(0 , add(bytecode , 32) , mload(bytecode) , salt);
        };
        IPair(oair).initialize(token0 , token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair;
        allPairs.push(pair);
        emit PairCreated( token0 , token1 , pair , allPairs.Length);

    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == _feeTo , "Access Denied");
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == _feeToSetter , "Access Denied");
        feeToSetter = _feeToSetter;
    }
}