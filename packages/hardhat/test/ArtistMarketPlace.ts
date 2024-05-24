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

    it("Should allow buying artwork", async function () {
      const { artistMarketPlace, addr1, addr2, owner } = await loadFixture(deployTokenFixture);
      const artwork = {
        url: "http://example.com/artwork1",
        artType: 0, // AIGenerated
        cost: ethers.parseEther("1"),
        likes: 0,
        creator: await owner.getAddress(),
        owner: addr1.address,
      };

      await artistMarketPlace.saveArtWorkDetails(artwork);
      await artistMarketPlace.connect(addr2).buyArtWork(0, { value: artwork.cost });
      const updatedArtwork = await artistMarketPlace.s_artworks(0);
      expect(updatedArtwork.owner).to.equal(addr2.address);
      const commission = await artistMarketPlace.s_artistCommision(owner.getAddress());
      expect(+commission.toString()).to.equal(+artwork.cost.toString());
    });

    it("Should revert if insufficient amount is sent for buying artwork", async function () {
      const { artistMarketPlace, addr1, addr2, owner } = await loadFixture(deployTokenFixture);
      const artwork = {
        url: "http://example.com/artwork1",
        artType: 0, // AIGenerated
        cost: ethers.parseEther("1"),
        likes: 0,
        creator: owner.getAddress(),
        owner: addr1.address,
      };

      await artistMarketPlace.saveArtWorkDetails(artwork);
      await expect(
        artistMarketPlace.connect(addr2).buyArtWork(0, { value: ethers.parseEther("0.5") }),
      ).to.be.revertedWithCustomError(artistMarketPlace, "ErrorAmountNotSufficientToBuyArtwork");
    });

    it("Should revert if artwork does not exist when buying", async function () {
      const { artistMarketPlace, addr2 } = await loadFixture(deployTokenFixture);
      await expect(
        artistMarketPlace.connect(addr2).buyArtWork(0, { value: ethers.parseEther("1") }),
      ).to.be.revertedWithCustomError(artistMarketPlace, "ErrorArtworkNotInTheSuppliedIndex");
    });

    it("Should allow withdrawing commission", async function () {
      const { artistMarketPlace, addr2, owner } = await loadFixture(deployTokenFixture);
      const artwork = {
        url: "http://example.com/artwork1",
        artType: 0, // AIGenerated
        cost: ethers.parseEther("1"),
        likes: 0,
        creator: owner.getAddress(),
        owner: owner.getAddress(),
      };

      await artistMarketPlace.saveArtWorkDetails(artwork);
      await artistMarketPlace.connect(addr2).buyArtWork(0, { value: artwork.cost });
      const initialBalance = await ethers.provider.getBalance(owner.getAddress());
      await artistMarketPlace.connect(owner).withdrawCommision();
      const finalBalance = await ethers.provider.getBalance(owner.getAddress());
      expect(finalBalance).to.be.gt(initialBalance);
    });

    it("Should revert if no commission to withdraw", async function () {
      const { artistMarketPlace, addr1 } = await loadFixture(deployTokenFixture);
      await expect(artistMarketPlace.connect(addr1).withdrawCommision()).to.be.revertedWithCustomError(
        artistMarketPlace,
        "ErrorNoCommisionToWithdraw",
      );
    });
  });
});
