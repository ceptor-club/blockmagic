import { Router } from 'express';
import { createCharacter, getCharacterById, updateCharacter, deleteCharacter, listCharacters } from '../controllers/characterController';

const router = Router();

router.post('/', createCharacter);
router.get('/:id', getCharacterById);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);
router.get('/', listCharacters);

export default router;