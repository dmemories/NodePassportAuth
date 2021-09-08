const express = require('express')
const flash = require('express-flash')
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const passport = require('passport')
const initPassportLocal = require('./config/passport-local')
require('dotenv').config()

// Initial
const app = express()
const svPort = process.env.PORT || 3000
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET || 'foobar',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(express.static('public'))
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(passport.initialize())
app.use(passport.session())
initPassportLocal(passport)

// Database
try {
    mongoose.connect(process.env.MONGO_CONNECT, () => console.log('Mongoose is Running'))
} catch (err) {
    console.log('\x1b[31m%s\x1b[0m', `Mongoose Error : ${err}`)
}

// Routes
app.use((req, res, next) => {
    res.locals.errMsg = req.flash('errMsg')
    res.locals.succMsg = req.flash('succMsg')
    res.locals.error = req.flash('error')
    next()
})
app.use('/', require('./routes/index'))
app.use('/user/', require('./routes/user'))

app.listen(svPort, () => console.log(`Server is running on port ${svPort}`))