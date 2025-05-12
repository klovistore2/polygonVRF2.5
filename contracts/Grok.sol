// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract Grok is VRFConsumerBaseV2Plus {
    uint256 public s_subscriptionId;
    
    address public vrfCoordinator = 0xec0Ed46f36576541C75739E915ADbCb3DE24bD77; // Polygon mainnet
    bytes32 public s_keyHash = 0x0ffbbd0c1c18c0263dd778dadd1d64240d7bc338d95fec1cf0473928ca7eaf9e; // 200 GWEI

    uint32 public callbackGasLimit = 2400000;
    uint16 public requestConfirmations = 3;
    uint32 public numWords = 1;
    uint256 public randomNumber;

    IVRFCoordinatorV2Plus internal immutable COORDINATOR;


    constructor(uint256 subscriptionId) VRFConsumerBaseV2Plus(vrfCoordinator) {
        s_subscriptionId = subscriptionId;
        COORDINATOR = IVRFCoordinatorV2Plus(vrfCoordinator);
    }

    function rollDice() public returns (uint256 requestId) {
        requestId = COORDINATOR.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(VRFV2PlusClient.ExtraArgsV1({nativePayment: false}))
            })
        );
    }

    function fulfillRandomWords(uint256, uint256[] memory randomWords) internal override {
        randomNumber = randomWords[0];

    }


    function getRandomNumber() public view returns (uint256) {
       return randomNumber;
    }
}

