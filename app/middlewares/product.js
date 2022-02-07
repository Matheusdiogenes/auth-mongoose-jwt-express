const Product = require("../models/product")

const create = async (req, res) => {    
    try {
        const product = req.body        
               
        await Product.create(product)                
        
        return res.send({
            product: product,
        })
        
    } catch (error) {
        return res.send({
            error: error.message
        })
    }
}

const show = async (req, res) => {    
    try {
        const product = await Product.find()                
        
        return res.send({
            product: product,
        })
        
    } catch (error) {
        return res.send({
            error: error.message
        })
    }
}


module.exports = {
    create,
    show
}