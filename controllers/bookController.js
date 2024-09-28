const Library = require('../models/Library');
const { getLibraryConnection } = require('../config/database');
const BookModel = require('../models/Book');

// Controller to add a book to a specific library
exports.addBook = async (req, res) => {
    const { libraryId } = req.params;
    const { title, author } = req.body;

    try {
        const library = await Library.findById(libraryId);
        if (!library) {
            return res.status(404).send({ message: 'Library not found' });
        }

        const libraryConnection = getLibraryConnection(library.dbName);
        const Book = BookModel(libraryConnection);

        const newBook = new Book({ title, author });
        await newBook.save();

        res.status(201).send({ message: 'Book added', book: newBook });
    } catch (error) {
        res.status(500).send({ message: 'Error adding book', error });
    }
};

// Controller to get a book by its ID
exports.getBook = async (req, res) => {
    const { libraryId, bookId } = req.params;

    try {
        const library = await Library.findById(libraryId);
        if (!library) {
            return res.status(404).send({ message: 'Library not found' });
        }

        const libraryConnection = getLibraryConnection(library.dbName);
        const Book = BookModel(libraryConnection);

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).send({ message: 'Book not found' });
        }

        res.status(200).send({ book });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching book', error });
    }
};
