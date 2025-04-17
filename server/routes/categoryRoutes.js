const express = require('express');
const router = express.Router();
const { getCategoriesByType } = require('../controllers/categoryController');

// Matches GET /api/categories/:type
router.get('/:type', getCategoriesByType);
export default router;
