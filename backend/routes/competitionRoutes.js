import express from 'express';
import { getCompetitions, createCompetition, deleteCompetition, updateCompetition } from '../controllers/competitionController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCompetitions);
router.post('/', protectAdmin, createCompetition);
router.put('/:id', protectAdmin, updateCompetition);
router.delete('/:id', protectAdmin, deleteCompetition);

export default router;
