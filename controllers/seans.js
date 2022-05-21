const Seans = require('../models/Seans')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll =  async function(req, res) {
    try {
        const seanses = await Seans.find({user: req.user.id})
        setTimeout(() => {
            res.status(200).json(seanses)
        }, 3000)
        //res.status(200).json(categories)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res) {
    
}
module.exports.create = async function(req, res) {    
    
}
module.exports.update = async function(req, res) {
    
}