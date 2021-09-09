const FacebookStrategy = require('passport-facebook').Strategy

module.exports = function(passport) {
    const callbfunc = (accessToken, refreshToken, profile, done) => {
        done(null, profile)
    }

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APPID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.HOSTNAME + '/user/login-facebook/callback',
        profileFields: ['id', 'displayName', 'emails']
      }, callbfunc
    ))
    
}