const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    name: {
        type: String, required: false
    },
    post: {
        type: String, required: false
    }
})

module.exports = mongoose.model('users', userSchema)
