const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/add-book/:libraryId', bookController.addBook);
router.get('/book/:libraryId/:bookId', bookController.getBook);

module.exports = router;
