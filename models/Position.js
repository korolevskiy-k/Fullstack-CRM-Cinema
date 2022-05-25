const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionSchema = new Schema({
    name: {
        type: String, required: true
    },
    cost: {
        type: Number, required: true
    },
    category: {
        ref: 'categories', type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users', type: Schema.Types.ObjectId
    },
    description: {
        type: String
    },
    time: {
        type: Number, required: true
    }

})

module.exports = mongoose.model('positions', positionSchema)