const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');

router.post('/add-library', libraryController.addLibrary);

module.exports = router;
