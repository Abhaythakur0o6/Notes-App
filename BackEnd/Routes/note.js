require("dotenv").config();
const express = require("express");
const Note = require("../models/Notes")
const User = require("../models/user")
const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");
const router = express.Router();

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET

router.get('/', (req, res) => {
    res.send("Home Page")
})

//New Note

router.post("/newnote", async (req, res) => {
    const { title, content, user } = req.body
    try {
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
    } catch (error) {
        res.status(500).json({ message: "Error creating note", error });
    }
})

// Update Route

router.post("/updatenote", async (req, res) => {
    try {
        const { id, title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true },
        )
        if (!updatedNote) {
            res.status(404).json({ error: "Note not found" })
        }
        res.status(200).json({ success: true, message: "note updated sucessfully", updatedNote })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// Delete Route

router.post("/deletenote", async (req, res) => {
    const userId = req.body._id;
    const deletenote = await Note.findByIdAndDelete(userId);

    if (!deletenote) {
        return res.status(404).json({
            success: false,
            message: "note not found"
        })
    } else {
        res.json({
            success: true,
            message: "All notes deleted for this user"
        });
    }
})

//Notes Api

router.post('/allnotes', async (req, res) => {
    const { currentUserId } = req.body;
    try {
        const notes = await Note.find({ user: currentUserId });
        res.json({
            success: true,
            notes
        });
    } catch (error) {
        res.send(error)
    }
})

// User Register Routes

router.post("/signup", async (req, res) => {
    const { email, password } = req.body
    try {
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
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// User Login Routes

router.post("/login", async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "server error",
            success: false
        })
    }

})

module.exports = router;