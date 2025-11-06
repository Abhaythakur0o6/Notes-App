const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model("Note", notesSchema)