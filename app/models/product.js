const mongoose = require('../database/mongoose')

const ProductSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        lowercase: true,
    },
    productName: {
        type: String,
        required: true,
        lowercase: true,
    },
    price: {
        type: mongoose.Decimal128,
        required: true,        
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product