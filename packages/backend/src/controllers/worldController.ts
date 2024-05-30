import { Request, Response } from 'express';
import { World } from '../models/World';

export const createWorld = async (req: Request, res: Response) => {
  try {
    const newWorld = new World(req.body);
    await newWorld.save();
    res.status(201).json(newWorld);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getWorldById = async (req: Request, res: Response) => {
  try {
    const world = await World.findById(req.params.id);
    if (!world) {
      return res.status(404).json({ message: 'World not found' });
    }
    res.status(200).json(world);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWorld = async (req: Request, res: Response) => {
  try {
    const updatedWorld = await World.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWorld) {
      return res.status(404).json({ message: 'World not found' });
    }
    res.status(200).json(updatedWorld);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteWorld = async (req: Request, res: Response) => {
  try {
    const deletedWorld = await World.findByIdAndDelete(req.params.id);
    if (!deletedWorld) {
      return res.status(404).json({ message: 'World not found' });
    }
    res.status(200).json({ message: 'World deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listWorlds = async (req: Request, res: Response) => {
  const { search, ccId, vibe, page = 1, limit = 10 } = req.query;
  try {
    let query: any = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (ccId) {
      query.ccId = ccId;
    }
    if (vibe) {
      query.vibe = vibe;
    }
    const worlds = await World.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await World.countDocuments(query);
    res.status(200).json({ worlds, total, page, limit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Example mock data for worlds
const mockWorlds = [
  {
    _id: '1',
    ccid: 'admin01'
    name: 'Fantasy Land',
    description: 'A world full of magic and dragons.',
    vibe: 'chill',
    externalId: 'world-1',
    // ... other properties ...
  },
  {
    _id: '42',
    ccid: 'admin01'
    name: 'Techno Land',
    description: 'A world full of technology and gadgets.',
    vibe: 'intense',
    externalId: 'world-2',
    // ... other properties ...
  },
  {
    _id: '70',
    ccid: 'admin01'
    name: 'Dimension Travlers Land',
    description: 'A world full of things unimaginable.',
    vibe: 'unknown',
    externalId: 'world-3',
    // ... other properties ...
  },
  // ... more mock worlds ...
];

// Serve mock data in your API route
export const listWorlds = async (req: Request, res: Response) => {
  res.status(200).json(mockWorlds);
};