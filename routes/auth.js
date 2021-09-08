module.exports = {
    loginAuthen: function (req, res, next) {
        if (req.isAuthenticated()) return next()
        req.flash('errMsg', 'Please login first');
        res.redirect('/user/login');
    }
}