import { Request, Response } from 'express';
import { Campaign } from '../models/Campaign';

export const createCampaign = async (req: Request, res: Response) => {
  const { worldId, ccId } = req.body;
  try {
    const world = await World.findById(worldId);
    if (!world) {
      return res.status(404).json({ message: 'World not found' });
    }
    if (world.ccId !== ccId && !world.permissions.includes(ccId)) {
      return res.status(403).json({ message: 'Not authorized to create campaign in this world' });
    }
    const newCampaign = new Campaign(req.body);
    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCampaignById = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findOne({ externalId: req.params.id });
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const updatedCampaign = await Campaign.findOneAndUpdate({ externalId: req.params.id }, req.body, { new: true });
    if (!updatedCampaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const deletedCampaign = await Campaign.findOneAndDelete({ externalId: req.params.id });
    if (!deletedCampaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

export const listCampaigns = async (req: Request, res: Response) => {
  const { name, worldId, ccId, numCharacters, frequency } = req.query;
  try {
    const query = {};
    if (name) query.name = name;
    if (worldId) query.worldId = worldId;
    if (ccId) query.ccId = ccId;
    if (numCharacters) query.numCharacters = numCharacters;
    if (frequency) query.frequency = frequency;

    const campaigns = await Campaign.find(query);
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listCampaignsByWorld = async (req: Request, res: Response) => {
  const { worldExternalId } = req.query;

  try {
    // Find the world by its externalId
    const world = await World.findOne({ externalId: worldExternalId });
    if (!world) {
      return res.status(404).json({ message: 'World not found' });
    }

    // Find campaigns associated with the world's _id
    const campaigns = await Campaign.find({ worldId: world._id });

    // Send the list of campaigns in the response
    res.status(200).json(campaigns);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: error.message });
  }
};

// Example mock data for campaigns
const mockCampaigns = [
  {
    _id: '1',
    name: 'The Quest for the Holy Grail',
    description: 'Embark on an epic quest to find the legendary Holy Grail.',
    externalId: 'campaign-1',
    worldId: '1',
    // ... other properties ...
  },
  // ... more mock campaigns ...
];

// Serve mock data in your API route
export const listCampaigns = async (req: Request, res: Response) => {
  const { worldId } = req.query;
  const filteredCampaigns = mockCampaigns.filter(campaign => campaign.worldId === worldId);
  res.status(200).json(filteredCampaigns);
};