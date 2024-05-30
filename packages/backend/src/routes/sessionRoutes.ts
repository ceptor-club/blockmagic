import { Router } from 'express';
import { createSession, getSessionById, updateSession, deleteSession, listSessions } from '../controllers/sessionController';

const router = Router();

router.post('/', createSession);
router.get('/:id', getSessionById);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);
router.get('/', listSessions);

export default router;