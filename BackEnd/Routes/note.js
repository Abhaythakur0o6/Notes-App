const express = require("express");
const auth = require("../middleware/auth");
const { newNote, updateNote, deleteNote, allNotes } = require("../controllers/NoteController");
const { signUp, logIn } = require("../controllers/UserController");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Home Page")
})

//New Note
router.post("/newnote", auth, newNote )

// Update Route
router.post("/updatenote",auth,updateNote )

// Delete Route
router.post("/deletenote",auth,deleteNote)

//Notes Api
router.post('/allnotes',auth, allNotes)

// User Register Routes
router.post("/signup",signUp )

// User Login Routes
router.post("/login",logIn )

module.exports = router;