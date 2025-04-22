import express from 'express';
import { updateUserSettings, getUserById } from '../controllers/userController.js';

const router = express.Router();

router.put('/:id/settings', updateUserSettings);
router.get('/:id', getUserById); // To fetch current settings in <Settings />

export default router;