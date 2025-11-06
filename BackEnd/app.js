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
const main = async () => {
    await mongoose.connect(MONGO_URL)
}

app.use("/", notesRoute)

main().then(() => {
    console.log("connected to db")
}).catch(err => {
    console.log(err)
})

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})