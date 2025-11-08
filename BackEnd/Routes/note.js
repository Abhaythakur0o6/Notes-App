require("dotenv").config();
const express = require("express");
const Note = require("../models/Notes")
const User = require("../models/user")
const jwt = require("jsonwebtoken");
const { notesValidate, userValidate, updateNotesValidate } = require("../SchemaValidationi");
const wrapAsync = require("../utils/wrapAsync");
const auth = require("../middleware/auth");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET

router.get('/', (req, res) => {
    res.send("Home Page")
})

//New Note

router.post("/newnote", auth, wrapAsync(async (req, res) => {
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
}))

// Update Route

router.post("/updatenote",auth, wrapAsync(async (req, res) => {
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
}))

// Delete Route

router.post("/deletenote",auth, wrapAsync(async (req, res) => {
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
}))

//Notes Api

router.post('/allnotes',auth, wrapAsync(async (req, res) => {
    const { currentUserId } = req.body;
    const notes = await Note.find({ user: currentUserId });
    res.json({
        success: true,
        notes
    });
}))

// User Register Routes

router.post("/signup", wrapAsync(async (req, res) => {
    const { error } = userValidate.validate(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        })
    }
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ message: "user already exists" })
    }
    const newUser = new User({
        email: email,
        password: password
    })
    await newUser.save()
    res.json({ success: true, email })
}))

// User Login Routes

router.post("/login", wrapAsync(async (req, res) => {
    const { error } = userValidate.validate(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        })
    }
    const { email, password } = req.body
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
        const existingUserId = existingUser._id;
        if (existingUser.password === password) {
            const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: "2d" })
            res.json({ existingUserId, token, success: true, message: "Welcome Back" })
        } else {
            res.json({ success: false, message: "Invalid Password" })
        }
    } else {
        res.json({ success: false, message: "User does not exist" })
    }
}))

module.exports = router;