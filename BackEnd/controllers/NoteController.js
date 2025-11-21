const wrapAsync = require("../utils/wrapAsync");
const { notesValidate, updateNotesValidate } = require("../SchemaValidationi");
const Note = require("../models/Notes")



//New Note
module.exports.newNote = wrapAsync(async (req, res) => {
    const { title, content, user } = req.body
    const { error } = notesValidate.validate(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        })
    }
    const note = new Note({
        title: title,
        content: content,
        user: user
    })
    await note.save();
    res.status(201).json({
        success: true,
        message: "Note created successfully",
        note
    });
})

//Update Controller
module.exports.updateNote = wrapAsync(async (req, res) => {
    const { error } = updateNotesValidate.validate(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        })
    }
    const { id, title, content } = req.body
    const updatedNote = await Note.findByIdAndUpdate(
        id,
        { title, content },
        { new: true },
    )
    if (!updatedNote) {
        return res.status(404).json({ error: "Note not found" })
    }
    res.status(200).json({ success: true, message: "note updated sucessfully", updatedNote })
})

//Delete Note

module.exports.deleteNote =  wrapAsync(async (req, res) => {
    const noteId = req.body._id;
    const deletenote = await Note.findByIdAndDelete(noteId);

    if (!deletenote) {
        return res.status(404).json({
            success: false,
            message: "note not found"
        })
    } else {
        res.json({
            success: true,
            message: "Note Deleted"
        });
    }
})

//Fetch All Notes

module.exports.allNotes = wrapAsync(async (req, res) => {
    const { currentUserId } = req.body;
    const notes = await Note.find({ user: currentUserId });
    res.json({
        success: true,
        notes
    });
})