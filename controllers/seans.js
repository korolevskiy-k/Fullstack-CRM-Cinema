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
    try {
        await Seans.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Позиция была удалена'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function(req, res) {    
    const seans = new Seans({
        name: req.body.name,
        user: req.user.id       
    })
 
    try {
        await seans.save()
        res.status(201).json(seans)
    } catch (e) {
        errorHandler(res, e)
    }
    
}
module.exports.update = async function(req, res) {
    try {
        const seans = await Seans.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
            )
        res.status(200).json(seans)

    } catch (e) {
        errorHandler(res, e)
    }
}