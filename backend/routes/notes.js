const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middlewares/fetchuser');
const { body, validationResult } = require('express-validator');

// Route 1: Fetching all notes of a user using: POST "/api/notes/fetchallnotes". Require login
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": 'An error occurred' });
    }
});

// Route 1: Adding a note using: POST "/api/notes/fetchallnotes". Require login
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {

        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ errors: validationResult(req).array() });
        }

        // We can use destructuring like this-
        const { title, description, tag } = req.body;

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()
        res.json(savedNote);

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": 'An error occurred' });
    }
});

// Route 3: Updating a note using: PUT "/api/notes/updatenote". Require login
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    // Replace :id with the id of the note to be updated in the url

    const { title, description, tag } = req.body;

    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        // req.params.id is the id in the url 
        if (!note) { return res.status(404).send("Not Found") }

        // To check if the note belong to the user who is updating it
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        // {new: true} is used to create a new note if the note doesn't exist

        res.send(note);

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": 'An error occurred' });
    }
});

// Route 4: Deleting a note using: DELETE "/api/notes/deletenote". Require login
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        // req.params.id is the id in the url 
        if (!note) { return res.status(404).send("Not Found") }

        // To check if the note belong to the user who is deleting it
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);

        res.send("Note has been deleted");

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": 'An error occurred' });
    }
});

module.exports = router;