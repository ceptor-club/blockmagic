//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { IVRFCoordinatorV2Plus } from "@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFCoordinatorV2Plus.sol";
import { VRFConsumerBaseV2Plus } from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import { VRFV2PlusClient } from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

import "hardhat/console.sol";

//75868828114239004182696661166274810031260136627899410775239615499108111680872

contract ArtistMarketPlace is VRFConsumerBaseV2Plus {
	event RequestSent(uint256 requestId, uint32 numWords);
	event RequestFulfilled(uint256 requestId, uint256[] randomWords);

	struct RequestStatus {
		bool fulfilled; // whether the request has been successfully fulfilled
		bool exists; // whether a requestId exists
		uint256[] randomWords;
	}

	struct Artist {
		address artistAddress;
		string artistName;
	}

	mapping(uint256 => RequestStatus) public s_requests;

	//VRF Sepolia Chain
	IVRFCoordinatorV2Plus COORDINATOR;
	address vrfCoordinator = 0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE;
    //0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B;
	bytes32 keyHash = 0xc799bd1e3bd4d1a41cd4968997a4e03dfd2a3c7c04b695881138580163f42887;
		
        //0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;
	uint32 callbackGasLimit = 2500000;
	uint16 requestConfirmations = 3;
	uint32 numWords = 1;

	// State Variables
	address private s_linkAddress;
	Artist[] public s_artist;

	// Your subscription ID.
	uint256 public s_subscriptionId;
	uint256[] public requestIds;
	uint256 public lastRequestId;
    uint256[] public lastRandomWords;

	uint256 public featuredArtistIndex = 0;

	constructor(uint256 subscriptionId) VRFConsumerBaseV2Plus(vrfCoordinator) {
		COORDINATOR = IVRFCoordinatorV2Plus(vrfCoordinator);
		s_subscriptionId = subscriptionId;
		//create Text artist data here
		_createTestArtist();
	}

	function getRandomWords() external returns (uint256 requestId) {
		requestId = COORDINATOR.requestRandomWords(
			VRFV2PlusClient.RandomWordsRequest({
				keyHash: keyHash,
				subId: s_subscriptionId,
				requestConfirmations: requestConfirmations,
				callbackGasLimit: callbackGasLimit,
				numWords: numWords,
				extraArgs: VRFV2PlusClient._argsToBytes(
					VRFV2PlusClient.ExtraArgsV1({ nativePayment: false })
				)
			})
		);
		  s_requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false
        });
		requestIds.push(requestId);
		lastRequestId = requestId;
		emit RequestSent(requestId, numWords);
		return requestId;
	}

	function fulfillRandomWords(
		uint256 _requestId,
		uint256[] memory _randomWords
	) internal override {
		require(s_requests[_requestId].exists, "request not found");
		s_requests[_requestId].fulfilled = true;
		s_requests[_requestId].randomWords = _randomWords;
        lastRandomWords = _randomWords;
		featuredArtistIndex = lastRandomWords[0] % s_artist.length;
		emit RequestFulfilled(_requestId, _randomWords);
	}

	function displayArtistOfTheDay() public view returns (Artist memory) {
		return s_artist[featuredArtistIndex];
	}

	function _createTestArtist() private {
		uint8 index = 0;
		for (index; index < 2; index++) {
			if (index == 0) {
				s_artist.push(Artist(address(this), "Jamie Bones"));
				continue;
			}
			s_artist.push(Artist(address(this), "Jamie"));
		}
	}
}
