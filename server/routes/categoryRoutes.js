const express = require('express');
const router = express.Router();
const { getCategoriesByType } = require('../controllers/categoryController');

router.get('/:type', getCategoriesByType); // e.g. /api/categories/income

module.exports = router;