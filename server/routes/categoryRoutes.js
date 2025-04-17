const express = require('express');
const router = express.Router();
const { getCategoriesByType } = require('../controllers/categoryController');

router.get('/categories/:type', getCategoriesByType);

module.exports = router;