const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const { loginAuthen } = require('./auth')

router.get('/register', (req, res) => res.render('register.ejs'))
router.post('/register', async (req, res) => {
    const { email, password } = req.body
    /*
        Validate data stuff ....
    */
    try {
        let query = new User({ email, password })
        query = await query.save()
        req.flash('succMsg', 'Register Successfully !')
    } catch (err)  {
        req.flash('errMsg', err)
    }
    res.redirect('./register')
})

router.get('/login', (req, res) => res.render('login.ejs'))
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: './login',
      failureFlash: true
    })(req, res, next)
})

router.post('/login-facebook', passport.authenticate('facebook'))
router.get('/login-facebook/callback',
    passport.authenticate('facebook', { failureRedirect: './login' }),
    (req, res) => { res.redirect('/home') }
);

router.post('/login-google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}))
router.get('/login-google/callback',
    passport.authenticate('google', { failureRedirect: './login' }),
    (req, res) => { res.redirect('/home') }
);

router.post('/logout', loginAuthen, (req, res) => {
    req.logOut()
    req.flash('succMsg', 'Logout Successfully !')
    res.redirect('./login')
})

module.exports = router