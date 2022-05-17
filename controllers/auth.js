const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        // Проверка пароля, пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Генерация токена - пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Пароли не совпадают'
            }) // Пароли не совпали
        }
    } else {
        // Пользователя нет - ошибка
        res.status(404).json({
            message: 'Пользователь не найден!'
        }) // Пользователь не найден
    }

}

module.exports.register = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        // Пользователь существует - ошибка
        res.status(409).json ({
            message: 'Email уже используется!'
        }) // Статус conflict
    } else {
        // Создаем пользователя
        const salt = bcrypt.genSaltSync(10) // Генерация хэша
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt) // Защищенный пароль
        })
        try {
            await user.save()
            res.status(201).json(user) // Пользователь создан
        } catch(e) {
            errorHandler(res, e)
        }
        
    }
}