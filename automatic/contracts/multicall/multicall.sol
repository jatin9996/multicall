// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Multicall {
    struct Call {
        address target;
        bytes callData;
    }

    // Event to log the results of each call for easier off-chain processing
    event CallExecuted(uint indexed callIndex, address indexed target, bytes data);

    function aggregate(Call[] memory calls) public returns (uint256 blockNumber, bytes[] memory returnData) {
        blockNumber = block.number;
        returnData = new bytes[](calls.length);

        for (uint i = 0; i < calls.length; i++) {
            (bool success, bytes memory data) = calls[i].target.call(calls[i].callData);

            require(success, "Call failed");
            returnData[i] = data;
            emit CallExecuted(i, calls[i].target, data); // Emit an event for each successful call
        }
    }
}