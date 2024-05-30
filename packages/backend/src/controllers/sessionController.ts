import { Request, Response } from 'express';
import { Session } from '../models/Session';

export const createSession = async (req: Request, res: Response) => {
  try {
    const newSession = new Session(req.body);
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSessionById = async (req: Request, res: Response) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  try {
    const updatedSession = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const deletedSession = await Session.findByIdAndDelete(req.params.id);
    if (!deletedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.status(200).json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await Session.find({});
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSessionDetails = async (req: Request, res: Response) => {
  try {
    const session = await Session.findOne({ externalId: req.params.externalId }).populate('characters');
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};