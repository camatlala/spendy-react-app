import express from 'express';
import { getCategoriesByType } from '../controllers/categoryController.js';

const router = express.Router();

// Matches GET /api/categories/:type
router.get('/:type', getCategoriesByType);

export default router;