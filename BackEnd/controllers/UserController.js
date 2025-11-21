const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user")
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require("bcrypt")
const {userValidate} = require("../SchemaValidationi")

//Signup
module.exports.signUp = wrapAsync(async (req, res) => {
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

    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new User({
        email: email,
        password: hashedPassword
    })
    await newUser.save()
    res.json({ success: true, email })
})

//Login
module.exports.logIn = wrapAsync(async (req, res) => {
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
        const isMatch =  await bcrypt.compare(password,existingUser.password)
        if (isMatch) {
            const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: "7d" })
            res.json({ existingUserId, token, success: true, message: "Welcome Back" })
        } else {
            res.json({ success: false, message: "Invalid Password" })
        }
    } else {
        res.json({ success: false, message: "User does not exist" })
    }
})