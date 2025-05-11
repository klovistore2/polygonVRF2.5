// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import "@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFCoordinatorV2Plus.sol";

contract Grok is VRFConsumerBaseV2Plus {
    uint256 public s_subscriptionId;
    address public vrfCoordinator = 0xec0Ed46f36576541C75739E915ADbCb3DE24bD77; // Polygon mainnet
    bytes32 public s_keyHash;
    uint32 public callbackGasLimit;
    uint16 public requestConfirmations = 3;
    uint32 public numWords = 1;
    uint256 public randomNumber;

    IVRFCoordinatorV2Plus internal immutable COORDINATOR;

    event RandomNumberReceived(uint256 requestId, uint256 number);

    constructor(
        uint256 subscriptionId,
        bytes32 keyHash,
        uint32 gasLimit
    ) VRFConsumerBaseV2Plus(vrfCoordinator) {
        s_subscriptionId = subscriptionId;
        s_keyHash = keyHash;
        callbackGasLimit = gasLimit;
        COORDINATOR = IVRFCoordinatorV2Plus(vrfCoordinator);
        // owner est automatiquement msg.sender grâce à ConfirmedOwnerWithProposal
    }

    function setKeyHash(bytes32 newKeyHash) external onlyOwner {
        s_keyHash = newKeyHash;
    }

    function setCallbackGasLimit(uint32 newGasLimit) external onlyOwner {
        callbackGasLimit = newGasLimit;
    }

    function rollDice() public returns (uint256 requestId) {
        requestId = COORDINATOR.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        randomNumber = randomWords[0];
        emit RandomNumberReceived(requestId, randomNumber);
    }
}
