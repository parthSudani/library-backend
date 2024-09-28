const Library = require('../models/Library');
const { getLibraryConnection } = require('../config/database');
const BookModel = require('../models/Book');

// Controller to add a library
exports.addLibrary = async (req, res) => {
    const { name } = req.body;
    const dbName = `library_${name.toLowerCase().replace(/\s+/g, '_')}`;

    try {
        // Save the library in the central database
        const newLibrary = new Library({ name, dbName });
        await newLibrary.save();

        // Create a new connection for the library and initialize the Book model
        const libraryConnection = getLibraryConnection(dbName);
        libraryConnection.model('Book', BookModel);

        res.status(201).send({ message: 'Library created and connected', library: newLibrary });
    } catch (error) {
        res.status(500).send({ message: 'Error creating library', error });
    }
};
