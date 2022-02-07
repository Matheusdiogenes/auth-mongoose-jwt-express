const router = require('express').Router()

// Middlewares
const sign = require('./middlewares/sign')
const auth = require('./middlewares/auth')
const product = require('./middlewares/product')

// Routes
router.post('/register', sign.register )
router.get('/login', sign.login )

router.post('/product', auth, product.create)
router.get('/product', auth, product.show)

module.exports = router