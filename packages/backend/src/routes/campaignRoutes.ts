import { Router } from 'express';
import { createCampaign, getCampaignById, updateCampaign, deleteCampaign, listCampaigns } from '../controllers/campaignController';

const router = Router();

router.post('/', createCampaign);
router.get('/:id', getCampaignById);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);
router.get('/', listCampaigns);

export default router;