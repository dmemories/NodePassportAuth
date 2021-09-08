const express = require('express')
const router = express.Router()
const { loginAuthen } = require('./auth')

router.get('/', (req, res) => { res.redirect('user/login') })
router.get('/home', loginAuthen, (req, res) => {
    res.render('home.ejs', { user: req.user })
})

module.exports = router