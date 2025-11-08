require('dotenv').config();
const express = require('express')
const mongoose = require("mongoose")
const notesRoute = require("./Routes/note")
const cors = require('cors')
const app = express();

//Middleware
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

// Routes
app.use("/", notesRoute)

//Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        success: false,
        message: err.message || "somethig went wrong"
    });
});

//Database Connection
const main = async () => {
    await mongoose.connect(MONGO_URL)
}
main().then(() => {
    console.log("connected to db")
}).catch(err => {
    console.log(err)
})

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})