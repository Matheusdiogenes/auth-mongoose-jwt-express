const router = require('express').Router()

// Middlewares
const sign = require('./middlewares/sign')
const auth = require('./middlewares/auth')
const product = require('./middlewares/product')
const password = require('./middlewares/resetPassword')

// Routes
router.post('/register', sign.register )
router.get('/login', sign.login )

router.post('/product', auth, product.create)
router.get('/product', auth, product.show)

router.get('/forgotpassword', password.forgotpassword)
router.post('/resetpassword', auth, password.resetpassword)

module.exports = router