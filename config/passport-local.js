const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = function(passport) {
    const callbfunc = async (email, password, done) => {
        let user = await User.findOne({ email, password })
        if (!user) return done(null, false, { message: 'Uusername or Password is invalid' })
        return done(null, user)
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, callbfunc))
}