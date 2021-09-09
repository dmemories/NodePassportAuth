const User = require('../models/User')

module.exports = function(passport) {
    passport.serializeUser((user, done) => {
        switch (user.provider) {
            case "facebook": done(null, { 
                email: user._json.email
            })
        }
        done(null, { id: user.id })
    })
    passport.deserializeUser(async (obj, done) => {
        if (!obj.id) done(null, obj)
        try {
            userObj = await User.findById(obj.id)
            done(null, userObj)
        } catch (err) {
            done(err)
        }
    })
}