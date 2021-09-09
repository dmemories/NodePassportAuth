const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(passport) {
    const callbfunc = (accessToken, refreshToken, profile, done) => {
        done(null, profile)
    }

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.HOSTNAME + '/user/login-google/callback',
      }, callbfunc
    ))
    
}

