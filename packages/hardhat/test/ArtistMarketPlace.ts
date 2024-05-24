import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ArtistMarketPlace } from "../typechain-types";

describe("ArtistMarketPlace", function () {
  const subscriptionId = 1; // Replace with your actual subscription ID

  async function deployTokenFixture() {
    // Get the Signers here.
    const [owner, addr1, addr2] = await ethers.getSigners();
    const artistMarketPlace = (await ethers.deployContract("ArtistMarketPlace", [subscriptionId])) as ArtistMarketPlace;
    await artistMarketPlace.waitForDeployment();
    return { artistMarketPlace, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should create test artists on deployment", async function () {
      const { artistMarketPlace } = await loadFixture(deployTokenFixture);
      const artist = await artistMarketPlace.s_artist(0);
      expect(artist.name).to.equal("Jamie Bones");
      expect(artist.style).to.equal(1);
    });
  });
  describe("ArtWorks", function () {
    it("Should allow saving artwork details", async function () {
      const { artistMarketPlace } = await loadFixture(deployTokenFixture);
      const artwork = {
        url: "http://example.com/artwork1",
        artType: 0, // AIGenerated
        cost: ethers.parseEther("1"),
        likes: 0,
        creator: "0x5cBEa346278d288207Fd4714E18551aF37441c15",
        owner: "0x5cBEa346278d288207Fd4714E18551aF37441c15",
      };

      await artistMarketPlace.saveArtWorkDetails(artwork);
      const savedArtwork = await artistMarketPlace.s_artworks(0);
      expect(savedArtwork.url).to.equal(artwork.url);
      expect(savedArtwork.cost.toString()).to.equal(artwork.cost.toString());
      expect(savedArtwork.creator).to.equal(artwork.creator);
    });

    it("Should revert if artwork details are incomplete", async function () {
      const { artistMarketPlace, owner } = await loadFixture(deployTokenFixture);
      const incompleteArtwork = {
        url: "",
        artType: 0,
        cost: ethers.parseEther("1"),
        likes: 0,
        creator: owner.address,
        owner: owner.address,
      };
      await expect(artistMarketPlace.saveArtWorkDetails(incompleteArtwork)).to.be.revertedWithCustomError(
        artistMarketPlace,
        "ErrorIncompleteArtWorkDetails()",
      );
    });

    it("Should retrieve the artist artworks", async function () {
      const { artistMarketPlace } = await loadFixture(deployTokenFixture);
      const artwork = {
        url: "http://example.com/artwork1",
        artType: 0, // AIGenerated
        cost: ethers.parseEther("1"),
        likes: 0,
        creator: "0x5cBEa346278d288207Fd4714E18551aF37441c15",
        owner: "0x5cBEa346278d288207Fd4714E18551aF37441c15",
      };

      await artistMarketPlace.saveArtWorkDetails(artwork);
      const artistIndex = await artistMarketPlace.s_artistIndex(artwork.creator);
      const artist = await artistMarketPlace.getArtist(+artistIndex.toString());
      const artWorksArray = artist.artworks;
      const savedArtwork = await artistMarketPlace.s_artworks(artWorksArray[0]);
      expect(savedArtwork.url).to.equal(artwork.url);
    });
  });
});
