//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { IVRFCoordinatorV2Plus } from "@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFCoordinatorV2Plus.sol";
import { VRFConsumerBaseV2Plus } from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import { VRFV2PlusClient } from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

//75868828114239004182696661166274810031260136627899410775239615499108111680872

contract ArtistMarketPlace is ReentrancyGuard, VRFConsumerBaseV2Plus {
	event RequestSent(uint256 requestId, uint32 numWords);
	event RequestFulfilled(uint256 requestId, uint256[] randomWords);

	error ErrorNoCommisionToWithdraw();
	error ErrorArtWorkNotFound();
	error ErrorAmountNotSufficientToBuyArtwork(
		uint256 suppliedAmount,
		uint256 costPrice
	);
	error ErrorIncompleteArtWorkDetails();
	error ErrorArtistNotFound(address artistWallet);
	error ErrorArtworkNotInTheSuppliedIndex();

	enum ArtType {
		AIGenerated,
		HandDrawn
	}

	struct RequestStatus {
		bool fulfilled; // whether the request has been successfully fulfilled
		bool exists; // whether a requestId exists
		uint256[] randomWords;
	}

	//wallet name style,  number of arts , number of featured times

	struct ArtWork {
		string url;
		ArtType artType;
		uint256 cost;
		uint256 likes;
		address creator;
		address owner;
	}

	struct Artist {
		address wallet;
		string name;
		ArtType style;
		uint256 numberoFArts;
		uint256 numberFeaturedTimes;
		uint256[] artworks;
	}

	mapping(uint256 => RequestStatus) public s_requests;
	//artist address matched to artist commision held by the contract
	mapping(address => uint256) public s_artistCommision;
	//mapping of address to Artist array index
	mapping(address => uint) public s_artistIndex;
	//artwork
	ArtWork[] public s_artworks;
	Artist[] public s_artist;

	//VRF Sepolia Chain
	IVRFCoordinatorV2Plus COORDINATOR;
	address vrfCoordinator = 0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE;
	//0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B;
	bytes32 keyHash =
		0xc799bd1e3bd4d1a41cd4968997a4e03dfd2a3c7c04b695881138580163f42887;

	//0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;
	uint32 callbackGasLimit = 2500000;
	uint16 requestConfirmations = 3;
	uint32 numWords = 1;

	// State Variables
	address private s_linkAddress;

	// Your subscription ID.
	uint256 public s_subscriptionId;
	uint256[] public requestIds;
	uint256 public lastRequestId;
	uint256[] public lastRandomWords;

	uint256 public featuredArtistIndex = 0;

	modifier checkArtWorkDetails(ArtWork memory artwork) {
		if (
			bytes(artwork.url).length != 0 &&
			artwork.cost > 0 &&
			artwork.creator != address(0) &&
			artwork.owner != address(0)
		) {
			_;
		} else {
			revert ErrorIncompleteArtWorkDetails();
		}
	}

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
		//increment the number of times artist was featured
		if (s_artist[featuredArtistIndex].wallet != address(0)) {
			s_artist[featuredArtistIndex].numberFeaturedTimes++;
		}
		emit RequestFulfilled(_requestId, _randomWords);
	}

	function displayArtistOfTheDay() public view returns (Artist memory) {
		return s_artist[featuredArtistIndex];
	}

	function withdrawCommision() public payable nonReentrant {
		uint256 commision = s_artistCommision[msg.sender];
		if (commision > 0) {
			//withdraw the commision from the contract
			s_artistCommision[msg.sender] = 0;
			(bool success, ) = payable(msg.sender).call{ value: commision }("");
			require(success, "commision withdrawal failed");
		}else{
			revert ErrorNoCommisionToWithdraw();
		}
		
	}

	function buyArtWork(uint256 artWorkIndex) public payable {
		if ( artWorkIndex > s_artworks.length || s_artworks.length == 0 ){
			revert ErrorArtworkNotInTheSuppliedIndex();
		}
		ArtWork memory artwork = s_artworks[artWorkIndex];
		if (artwork.creator == address(0)) {
			revert ErrorArtWorkNotFound();
		}
		if (msg.value < artwork.cost) {
			revert ErrorAmountNotSufficientToBuyArtwork(
				msg.value,
				artwork.cost
			);
		}
		//buy the art
		s_artworks[artWorkIndex].owner = msg.sender;
		s_artistCommision[artwork.creator] += msg.value;

	}

	function saveArtWorkDetails(
		ArtWork memory artwork
	) public checkArtWorkDetails(artwork) {
		//save the artwork in the artwork storage
		uint256 index = s_artworks.length;
		s_artworks.push(artwork);
		//update the artist works array with the artwork index
		uint256 artistIndexInArray = s_artistIndex[artwork.creator];
		Artist storage artist = s_artist[artistIndexInArray];
		if (artist.wallet != artwork.creator) {
			revert ErrorArtistNotFound(artwork.creator);
		}
		//we good save the index in the artist work array
		uint256 artworkIndex = index == 0 ? index : index + 1;
		artist.artworks.push(artworkIndex);
		//s_artist[artistIndexInArray].artworks.push(artworkIndex);
		//console.log("artist artwork length: ", s_artist[artistIndexInArray].artworks.length);
	}

	function getArtist(uint256 index) public view returns (Artist memory artist) {
		return s_artist[index];
	}

	function _createTestArtist() private {
		uint256[] memory artworks;
		Artist memory artist1 = Artist({
			name: "Jamie Bones",
			wallet: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
			style: ArtType.HandDrawn,
			numberoFArts: 0,
			numberFeaturedTimes: 0,
			artworks: artworks
		});
		Artist memory artist2 = Artist({
			name: "Jamie Foster",
			wallet: 0x5cBEa346278d288207Fd4714E18551aF37441c15,
			style: ArtType.AIGenerated,
			numberoFArts: 0,
			numberFeaturedTimes: 0,
			artworks: artworks
		});
		//save the index in the mapping
		s_artist.push(artist1);
		s_artistIndex[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266] =
			s_artist.length -
			1;
		s_artist.push(artist2);
		s_artistIndex[0x5cBEa346278d288207Fd4714E18551aF37441c15] =
			s_artist.length -
			1;
	}

	receive() external payable {}
}

