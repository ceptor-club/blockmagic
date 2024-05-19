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
  try {
    const worlds = await World.find({});
    res.status(200).json(worlds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};