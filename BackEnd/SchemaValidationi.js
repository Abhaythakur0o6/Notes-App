const joi = require("joi")

module.exports.notesValidate = joi.object({
    title: joi.string().min(1).required(),
    content: joi.string().min(1).required(),
    user: joi.string().required()
})

module.exports.updateNotesValidate = joi.object({
    id: joi.string().required(),
    title: joi.string().min(1).required(),
    content: joi.string().required()
})

module.exports.userValidate = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})