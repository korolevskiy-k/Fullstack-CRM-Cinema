const { Passport } = require('passport/lib')
const keys = require('../config/keys')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Берем токен 
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
            const user = await User.findById(payload.userId).select('email id')

            if (user) {
                done(null, user)
            } else {
                done(null, false) // Пользователь не найден
            }
        } catch (e) {
            console.log(e)
        }
    })
)
}