import { Router } from 'express';
import { createWorld, getWorldById, updateWorld, deleteWorld, listWorlds } from '../controllers/worldController';

const router = Router();

router.post('/', createWorld);
router.get('/:id', getWorldById);
router.put('/:id', updateWorld);
router.delete('/:id', deleteWorld);
router.get('/', listWorlds);

export default router;