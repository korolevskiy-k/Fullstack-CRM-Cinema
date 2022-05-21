const mongoose = require('mongoose')
const Schema = mongoose.Schema

const seansSchema = new Schema({
    date: {
        type: Date, default: Date.now
    },
    seans: {
        type: Number, required: true
    },
    list: [
        {
            name: {
                type: String
            },
            cost: {
                type: Number
            },
        }
    ],
    user: {
        ref: 'users', type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('seanses', seansSchema)
