import { Request, Response } from 'express';
import { Character } from '../models/Character';

export const createCharacter = async (req: Request, res: Response) => {
  try {
    const newCharacter = new Character(req.body);
    await newCharacter.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCharacterById = async (req: Request, res: Response) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCharacter = async (req: Request, res: Response) => {
  try {
    const updatedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCharacter) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.status(200).json(updatedCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCharacter = async (req: Request, res: Response) => {
  try {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
    if (!deletedCharacter) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.status(200).json({ message: 'Character deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await Character.find({});
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};